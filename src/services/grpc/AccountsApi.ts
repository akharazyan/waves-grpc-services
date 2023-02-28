import bs58 from 'bs58';
import { credentials } from '@grpc/grpc-js';

import type { DataEntryResponse } from '../../types/proto/waves/node/grpc/DataEntryResponse';
import type { AccountsApiClient } from '../../types/proto/waves/node/grpc/AccountsApi';
import type { IDataStateApi, ProtoGrpcType, StateData, LogLevel, LogFormatter } from '../../types';
import { valueFromDataEntry } from '../../utils';
import Logger from '../logger';
import loadProto from './loader';

const ClientApi = loadProto<ProtoGrpcType>(
    'node_modules/@waves/protobuf-serialization/proto/waves/node/grpc/accounts_api.proto',
    { includeDirs: ['node_modules/@waves/protobuf-serialization/proto'] },
).waves.node.grpc.AccountsApi;

export class AccountsApi implements IDataStateApi {
    protected grpcUri: string;
    protected status: 'INITIAL' | 'CONNECTED' | 'RUNNING' | 'PAUSED' | 'STOPPED' = 'INITIAL';
    protected client?: AccountsApiClient;
    protected logger: Logger;

    constructor(options?: {
        grpcUri?: string;
        label?: string;
        log?: {
            level?: LogLevel;
            format?: LogFormatter;
        };
    }) {
        const { log, label, grpcUri } = options ?? {};
        const { level = 'none', format } = log ?? {};

        this.grpcUri = grpcUri ?? 'grpc.wavesnodes.com:6870';
        this.logger = new Logger(level, { label, format });
    }

    connect() {
        this.client = new ClientApi(this.grpcUri, credentials.createInsecure());
        this.status = 'CONNECTED';
    }

    getStatus() {
        return this.status;
    }

    async fetchState(address: string): Promise<StateData[]> {
        if (this.status === 'INITIAL') {
            await this.connect();
        }

        return new Promise((resolve, reject) => {
            const data: StateData[] = [];

            try {
                const stream = this.client?.getDataEntries({ address: bs58.decode(address) });

                stream?.on('data', (item: DataEntryResponse) => {
                    this.status = 'RUNNING';
                    if (item.entry == null || item.entry.key == null) {
                        return;
                    }
                    data.push({
                        key: item.entry.key,
                        ...valueFromDataEntry(item.entry),
                    });
                });
                stream?.on('end', () => {
                    this.status = 'CONNECTED';
                    resolve(data);
                });
                stream?.on('error', (e) => {
                    this.logger.error('[ACCOUNTS API SYNC]', e);
                    this.status = 'PAUSED';
                    reject(e);
                });
            } catch (e) {
                this.status = 'STOPPED';
                reject(e);
            }
        });
    }
}
