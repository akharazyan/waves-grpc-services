import assert from 'assert';
import { credentials, type ClientOptions, type ClientReadableStream } from '@grpc/grpc-js';

import type { SubscribeEvent } from '../../types/proto/waves/events/grpc/SubscribeEvent';
import type { GetBlockUpdateResponse } from '../../types/proto/waves/events/grpc/GetBlockUpdateResponse';
import type { BlockchainUpdatesApiClient } from '../../types/proto/waves/events/grpc/BlockchainUpdatesApi';
import type { BlockchainUpdated } from '../../types/proto/waves/events/BlockchainUpdated';
import type {
    IUpdatesListener,
    UpdatesListenerStatus,
    StatusChangeHandler,
    LogLevel,
    LogFormatter,
    ProtoGrpcType,
} from '../../types';
import { ONE_MINUTE } from '../../constants';
import { sleep } from '../../utils';
import Logger from '../logger';
import loadProto from './loader';

type UpdatesListenerBuilder = {
    label(label: string): UpdatesListenerBuilder;
    logLevel(level: LogLevel): UpdatesListenerBuilder;
    logFormat(format: LogFormatter): UpdatesListenerBuilder;
    from(height: number): UpdatesListenerBuilder;
    to(height: number): UpdatesListenerBuilder;
    buAddress(address: string): UpdatesListenerBuilder;
    onData(handler: (value: BlockchainUpdated) => Promise<void>): UpdatesListenerBuilder;
    grpcOption<T extends keyof ClientOptions>(key: T, value: ClientOptions[T]): UpdatesListenerBuilder;
    grpcOption(options: Partial<ClientOptions>): UpdatesListenerBuilder;
    grpcOption<T extends keyof ClientOptions>(
        keyOrOptions: T | Partial<ClientOptions>,
        value?: ClientOptions[T],
    ): UpdatesListenerBuilder;
    build(): BlockchainUpdates;
};

const BlockchainUpdatesApi = loadProto<ProtoGrpcType>(
    'node_modules/@waves/protobuf-serialization/proto/waves/events/grpc/blockchain_updates.proto',
    { includeDirs: ['node_modules/@waves/protobuf-serialization/proto'] },
).waves.events.grpc.BlockchainUpdatesApi;

const LIVENESS_CHECK_INTERVAL = 5 * ONE_MINUTE;

export class BlockchainUpdates implements IUpdatesListener {
    static builder = () => {
        const context: {
            label: string;
            buAddress: string;
            fromHeight: number;
            toHeight?: number;
            grpcClientOptions: Partial<ClientOptions>;
            logOptions: { level: LogLevel; format?: LogFormatter };
            onDataHandler?: (value: BlockchainUpdated) => Promise<void>;
        } = {
            label: 'BU',
            buAddress: 'grpc.wavesnodes.com:6881',
            fromHeight: 1,
            grpcClientOptions: {
                'grpc.max_receive_message_length': 10000000,
            },
            logOptions: { level: 'none' },
        };

        const builder: UpdatesListenerBuilder = {
            label(label) {
                context.label = label;
                return builder;
            },

            logLevel(level) {
                context.logOptions.level = level;
                return builder;
            },

            logFormat(format) {
                context.logOptions.format = format;
                return builder;
            },

            from(height) {
                context.fromHeight = height;
                return builder;
            },

            to(height) {
                context.toHeight = height;
                return builder;
            },

            buAddress(address) {
                context.buAddress = address;
                return builder;
            },

            onData(handler) {
                context.onDataHandler = handler;
                return builder;
            },

            grpcOption<T extends keyof ClientOptions>(
                keyOrOptions: T | Partial<ClientOptions>,
                value?: ClientOptions[T],
            ) {
                if (typeof keyOrOptions === 'object') {
                    context.grpcClientOptions = {
                        ...context.grpcClientOptions,
                        ...keyOrOptions,
                    };
                    return builder;
                }
                context.grpcClientOptions[keyOrOptions] = value;

                return builder;
            },

            build(): BlockchainUpdates {
                assert(
                    context.buAddress != null,
                    'You need to specify gRPC service address with active Blockchain Updates Extension',
                );
                assert(context.onDataHandler != null, 'You need to specify data handler');

                return new BlockchainUpdates(context.buAddress, context.onDataHandler, {
                    label: context.label,
                    log: context.logOptions,
                    grpcClientOptions: context.grpcClientOptions,
                    fromHeight: context.fromHeight,
                    toHeight: context.toHeight,
                });
            },
        };

        return builder;
    };

    readonly #buAddress: string;
    readonly #onDataHandler: (value: BlockchainUpdated) => Promise<void>;
    #queue: BlockchainUpdated[] = [];
    #client: BlockchainUpdatesApiClient;
    #stream: ClientReadableStream<SubscribeEvent> | null = null;
    #lastSeenTimestamp: number = 0;
    #currentHeight: number = 0;
    #toHeight?: number;
    #livenessCheckIntervalId?: NodeJS.Timer;
    #status: UpdatesListenerStatus = 'INITIAL';
    #logger: Logger;
    #onRun = () => {};
    #statusChangeHandlers: StatusChangeHandler[] = [];

    private setStatus = (status: UpdatesListenerStatus = 'INITIAL') => {
        if (this.#status !== status) {
            this.#logger.info(status);
            for (const handler of this.#statusChangeHandlers) {
                handler(status, this.#status);
            }
            this.#status = status;
        }
    };

    private run = async (): Promise<void> => {
        if (this.#status === 'RUNNING') {
            return;
        }
        this.setStatus('RUNNING');
        this.#onRun();

        return new Promise(async (resolve) => {
            while (true) {
                if (this.#status !== 'RUNNING') {
                    return resolve();
                }
                if (this.#queue.length === 0) {
                    await sleep(1000);
                    continue;
                }
                const update = this.#queue.shift()!;
                try {
                    await this.#onDataHandler?.(update);
                    if (update.height == null) {
                        continue;
                    }
                    this.#currentHeight = update.height;
                } catch (e: any) {
                    this.#logger.error(`[HANDLE UPDATE] at height ${this.#currentHeight}`, e);
                    this.stop(e);
                    resolve();
                    return this.restart();
                }
            }
        });
    };

    private handleUpdates = (value: GetBlockUpdateResponse) => {
        this.#lastSeenTimestamp = Date.now();
        this.startLivenessCheck();
        this.run();

        if (value.update?.update === 'append') {
            this.#queue.push(value.update);
        }
    };

    private connect() {
        if (this.#status === 'CONNECTING') {
            return;
        }
        this.setStatus('CONNECTING');
        this.#stream = this.#client.Subscribe({
            from_height: this.#currentHeight,
            to_height: this.#toHeight,
        });
        this.#stream.once('error', (err) => {
            this.#logger.error(err);
            this.stop(err).restart();
        });

        this.setStatus('CONNECTED');

        if (this.#onDataHandler != null) {
            this.#stream.on('data', this.handleUpdates);
        }
    }

    private startLivenessCheck() {
        this.stopLivenessCheck();
        if (this.#toHeight) {
            return;
        }
        this.#livenessCheckIntervalId = setInterval(() => {
            if (Date.now() - this.#lastSeenTimestamp > LIVENESS_CHECK_INTERVAL) {
                this.stop().restart();
            }
        }, LIVENESS_CHECK_INTERVAL);
    }

    private stopLivenessCheck() {
        clearInterval(this.#livenessCheckIntervalId);
    }

    private constructor(
        buAddress: string,
        onData: (value: BlockchainUpdated) => Promise<void>,
        options: {
            label?: string;
            grpcClientOptions?: ClientOptions;
            log: {
                level: LogLevel;
                format?: LogFormatter;
            };
            fromHeight: number;
            toHeight?: number;
        },
    ) {
        const { label, log, grpcClientOptions = {}, fromHeight, toHeight } = options ?? {};
        const { level, format } = log ?? {};

        this.#buAddress = buAddress;
        this.#onDataHandler = onData;
        this.#client = new BlockchainUpdatesApi(this.#buAddress, credentials.createInsecure(), grpcClientOptions);
        this.#logger = new Logger(level, { label, format });
        this.#currentHeight = fromHeight;
        this.#toHeight = toHeight;
    }

    start(): Promise<this> {
        return new Promise((resolve) => {
            this.#onRun = () => resolve(this);
            this.connect();
        });
    }

    pause(): this {
        this.stopLivenessCheck();
        this.#stream?.pause();
        this.setStatus('PAUSED');

        return this;
    }

    resume(): this {
        this.startLivenessCheck();
        this.#stream?.resume();

        return this;
    }

    async restart(): Promise<this> {
        await sleep(4000);
        this.startLivenessCheck();
        this.#currentHeight = this.#currentHeight - 3;
        this.connect();
        return this;
    }

    stop(error?: Error): this {
        this.stopLivenessCheck();
        this.#queue = [];
        this.#stream?.pause();
        this.#stream?.destroy(error);
        this.#client.close();
        this.setStatus('STOPPED');

        return this;
    }

    getStatus(): UpdatesListenerStatus {
        return this.#status;
    }

    onStatusChange(handler: StatusChangeHandler): () => void {
        this.#statusChangeHandlers.push(handler);
        return () => {
            this.#statusChangeHandlers = this.#statusChangeHandlers.filter((h) => h !== handler);
        };
    }
}
