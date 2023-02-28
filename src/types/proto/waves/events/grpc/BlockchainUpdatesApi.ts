// Original file: node_modules/@waves/protobuf-serialization/proto/waves/events/grpc/blockchain_updates.proto

import type {
    Client,
    Metadata,
    CallOptions,
    ClientReadableStream,
    ClientUnaryCall,
    handleServerStreamingCall,
    handleUnaryCall,
    requestCallback,
    ServiceDefinition,
    UntypedServiceImplementation,
} from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
    GetBlockUpdateRequest as _waves_events_grpc_GetBlockUpdateRequest,
    GetBlockUpdateRequest__Output as _waves_events_grpc_GetBlockUpdateRequest__Output,
} from '../../../waves/events/grpc/GetBlockUpdateRequest';
import type {
    GetBlockUpdateResponse as _waves_events_grpc_GetBlockUpdateResponse,
    GetBlockUpdateResponse__Output as _waves_events_grpc_GetBlockUpdateResponse__Output,
} from '../../../waves/events/grpc/GetBlockUpdateResponse';
import type {
    GetBlockUpdatesRangeRequest as _waves_events_grpc_GetBlockUpdatesRangeRequest,
    GetBlockUpdatesRangeRequest__Output as _waves_events_grpc_GetBlockUpdatesRangeRequest__Output,
} from '../../../waves/events/grpc/GetBlockUpdatesRangeRequest';
import type {
    GetBlockUpdatesRangeResponse as _waves_events_grpc_GetBlockUpdatesRangeResponse,
    GetBlockUpdatesRangeResponse__Output as _waves_events_grpc_GetBlockUpdatesRangeResponse__Output,
} from '../../../waves/events/grpc/GetBlockUpdatesRangeResponse';
import type {
    SubscribeEvent as _waves_events_grpc_SubscribeEvent,
    SubscribeEvent__Output as _waves_events_grpc_SubscribeEvent__Output,
} from '../../../waves/events/grpc/SubscribeEvent';
import type {
    SubscribeRequest as _waves_events_grpc_SubscribeRequest,
    SubscribeRequest__Output as _waves_events_grpc_SubscribeRequest__Output,
} from '../../../waves/events/grpc/SubscribeRequest';

export interface BlockchainUpdatesApiClient extends Client {
    GetBlockUpdate(
        argument: _waves_events_grpc_GetBlockUpdateRequest,
        metadata: Metadata,
        options: CallOptions,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdateResponse__Output>,
    ): ClientUnaryCall;
    GetBlockUpdate(
        argument: _waves_events_grpc_GetBlockUpdateRequest,
        metadata: Metadata,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdateResponse__Output>,
    ): ClientUnaryCall;
    GetBlockUpdate(
        argument: _waves_events_grpc_GetBlockUpdateRequest,
        options: CallOptions,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdateResponse__Output>,
    ): ClientUnaryCall;
    GetBlockUpdate(
        argument: _waves_events_grpc_GetBlockUpdateRequest,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdateResponse__Output>,
    ): ClientUnaryCall;
    getBlockUpdate(
        argument: _waves_events_grpc_GetBlockUpdateRequest,
        metadata: Metadata,
        options: CallOptions,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdateResponse__Output>,
    ): ClientUnaryCall;
    getBlockUpdate(
        argument: _waves_events_grpc_GetBlockUpdateRequest,
        metadata: Metadata,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdateResponse__Output>,
    ): ClientUnaryCall;
    getBlockUpdate(
        argument: _waves_events_grpc_GetBlockUpdateRequest,
        options: CallOptions,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdateResponse__Output>,
    ): ClientUnaryCall;
    getBlockUpdate(
        argument: _waves_events_grpc_GetBlockUpdateRequest,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdateResponse__Output>,
    ): ClientUnaryCall;

    GetBlockUpdatesRange(
        argument: _waves_events_grpc_GetBlockUpdatesRangeRequest,
        metadata: Metadata,
        options: CallOptions,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdatesRangeResponse__Output>,
    ): ClientUnaryCall;
    GetBlockUpdatesRange(
        argument: _waves_events_grpc_GetBlockUpdatesRangeRequest,
        metadata: Metadata,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdatesRangeResponse__Output>,
    ): ClientUnaryCall;
    GetBlockUpdatesRange(
        argument: _waves_events_grpc_GetBlockUpdatesRangeRequest,
        options: CallOptions,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdatesRangeResponse__Output>,
    ): ClientUnaryCall;
    GetBlockUpdatesRange(
        argument: _waves_events_grpc_GetBlockUpdatesRangeRequest,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdatesRangeResponse__Output>,
    ): ClientUnaryCall;
    getBlockUpdatesRange(
        argument: _waves_events_grpc_GetBlockUpdatesRangeRequest,
        metadata: Metadata,
        options: CallOptions,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdatesRangeResponse__Output>,
    ): ClientUnaryCall;
    getBlockUpdatesRange(
        argument: _waves_events_grpc_GetBlockUpdatesRangeRequest,
        metadata: Metadata,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdatesRangeResponse__Output>,
    ): ClientUnaryCall;
    getBlockUpdatesRange(
        argument: _waves_events_grpc_GetBlockUpdatesRangeRequest,
        options: CallOptions,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdatesRangeResponse__Output>,
    ): ClientUnaryCall;
    getBlockUpdatesRange(
        argument: _waves_events_grpc_GetBlockUpdatesRangeRequest,
        callback: requestCallback<_waves_events_grpc_GetBlockUpdatesRangeResponse__Output>,
    ): ClientUnaryCall;

    Subscribe(
        argument: _waves_events_grpc_SubscribeRequest,
        metadata: Metadata,
        options?: CallOptions,
    ): ClientReadableStream<_waves_events_grpc_SubscribeEvent__Output>;
    Subscribe(
        argument: _waves_events_grpc_SubscribeRequest,
        options?: CallOptions,
    ): ClientReadableStream<_waves_events_grpc_SubscribeEvent__Output>;
    subscribe(
        argument: _waves_events_grpc_SubscribeRequest,
        metadata: Metadata,
        options?: CallOptions,
    ): ClientReadableStream<_waves_events_grpc_SubscribeEvent__Output>;
    subscribe(
        argument: _waves_events_grpc_SubscribeRequest,
        options?: CallOptions,
    ): ClientReadableStream<_waves_events_grpc_SubscribeEvent__Output>;
}

export interface BlockchainUpdatesApiHandlers extends UntypedServiceImplementation {
    GetBlockUpdate: handleUnaryCall<
        _waves_events_grpc_GetBlockUpdateRequest__Output,
        _waves_events_grpc_GetBlockUpdateResponse
    >;

    GetBlockUpdatesRange: handleUnaryCall<
        _waves_events_grpc_GetBlockUpdatesRangeRequest__Output,
        _waves_events_grpc_GetBlockUpdatesRangeResponse
    >;

    Subscribe: handleServerStreamingCall<
        _waves_events_grpc_SubscribeRequest__Output,
        _waves_events_grpc_SubscribeEvent
    >;
}

export interface BlockchainUpdatesApiDefinition extends ServiceDefinition {
    GetBlockUpdate: MethodDefinition<
        _waves_events_grpc_GetBlockUpdateRequest,
        _waves_events_grpc_GetBlockUpdateResponse,
        _waves_events_grpc_GetBlockUpdateRequest__Output,
        _waves_events_grpc_GetBlockUpdateResponse__Output
    >;
    GetBlockUpdatesRange: MethodDefinition<
        _waves_events_grpc_GetBlockUpdatesRangeRequest,
        _waves_events_grpc_GetBlockUpdatesRangeResponse,
        _waves_events_grpc_GetBlockUpdatesRangeRequest__Output,
        _waves_events_grpc_GetBlockUpdatesRangeResponse__Output
    >;
    Subscribe: MethodDefinition<
        _waves_events_grpc_SubscribeRequest,
        _waves_events_grpc_SubscribeEvent,
        _waves_events_grpc_SubscribeRequest__Output,
        _waves_events_grpc_SubscribeEvent__Output
    >;
}
