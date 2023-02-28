// Original file: node_modules/@waves/protobuf-serialization/proto/waves/events/events.proto

import type {
    _waves_InvokeScriptResult_Call_Argument,
    _waves_InvokeScriptResult_Call_Argument__Output,
} from '../../waves/InvokeScriptResult';
import type { Amount as _waves_Amount, Amount__Output as _waves_Amount__Output } from '../../waves/Amount';
import type {
    InvokeScriptResult as _waves_InvokeScriptResult,
    InvokeScriptResult__Output as _waves_InvokeScriptResult__Output,
} from '../../waves/InvokeScriptResult';
import type { Long } from '@grpc/proto-loader';

export interface _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument {
    integer_value?: number | string | Long;
    binary_value?: Buffer | Uint8Array | string;
    string_value?: string;
    boolean_value?: boolean;
    list?: _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument_List | null;
    value?: 'integer_value' | 'binary_value' | 'string_value' | 'boolean_value' | 'list';
}

export interface _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument__Output {
    integer_value?: string;
    binary_value?: Buffer;
    string_value?: string;
    boolean_value?: boolean;
    list?: _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument_List__Output;
}

export interface _waves_events_TransactionMetadata_EthereumMetadata {
    timestamp?: number | string | Long;
    fee?: number | string | Long;
    sender_public_key?: Buffer | Uint8Array | string;
    transfer?: _waves_events_TransactionMetadata_EthereumTransferMetadata | null;
    invoke?: _waves_events_TransactionMetadata_InvokeScriptMetadata | null;
    Action?: 'transfer' | 'invoke';
}

export interface _waves_events_TransactionMetadata_EthereumMetadata__Output {
    timestamp?: string;
    fee?: string;
    sender_public_key?: Buffer;
    transfer?: _waves_events_TransactionMetadata_EthereumTransferMetadata__Output;
    invoke?: _waves_events_TransactionMetadata_InvokeScriptMetadata__Output;
}

export interface _waves_events_TransactionMetadata_EthereumTransferMetadata {
    recipient_address?: Buffer | Uint8Array | string;
    amount?: _waves_Amount | null;
}

export interface _waves_events_TransactionMetadata_EthereumTransferMetadata__Output {
    recipient_address?: Buffer;
    amount?: _waves_Amount__Output;
}

export interface _waves_events_TransactionMetadata_ExchangeMetadata {
    order_ids?: (Buffer | Uint8Array | string)[];
    order_sender_addresses?: (Buffer | Uint8Array | string)[];
    order_sender_public_keys?: (Buffer | Uint8Array | string)[];
}

export interface _waves_events_TransactionMetadata_ExchangeMetadata__Output {
    order_ids?: Buffer[];
    order_sender_addresses?: Buffer[];
    order_sender_public_keys?: Buffer[];
}

export interface _waves_events_TransactionMetadata_InvokeScriptMetadata {
    d_app_address?: Buffer | Uint8Array | string;
    function_name?: string;
    arguments?: _waves_InvokeScriptResult_Call_Argument[];
    payments?: _waves_Amount[];
    result?: _waves_InvokeScriptResult | null;
}

export interface _waves_events_TransactionMetadata_InvokeScriptMetadata__Output {
    d_app_address?: Buffer;
    function_name?: string;
    arguments?: _waves_InvokeScriptResult_Call_Argument__Output[];
    payments?: _waves_Amount__Output[];
    result?: _waves_InvokeScriptResult__Output;
}

export interface _waves_events_TransactionMetadata_LeaseMetadata {
    recipient_address?: Buffer | Uint8Array | string;
}

export interface _waves_events_TransactionMetadata_LeaseMetadata__Output {
    recipient_address?: Buffer;
}

export interface _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument_List {
    items?: _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument[];
}

export interface _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument_List__Output {
    items?: _waves_events_TransactionMetadata_InvokeScriptMetadata_Argument__Output[];
}

export interface _waves_events_TransactionMetadata_MassTransferMetadata {
    recipients_addresses?: (Buffer | Uint8Array | string)[];
}

export interface _waves_events_TransactionMetadata_MassTransferMetadata__Output {
    recipients_addresses?: Buffer[];
}

export interface _waves_events_TransactionMetadata_TransferMetadata {
    recipient_address?: Buffer | Uint8Array | string;
}

export interface _waves_events_TransactionMetadata_TransferMetadata__Output {
    recipient_address?: Buffer;
}

export interface TransactionMetadata {
    sender_address?: Buffer | Uint8Array | string;
    transfer?: _waves_events_TransactionMetadata_TransferMetadata | null;
    exchange?: _waves_events_TransactionMetadata_ExchangeMetadata | null;
    mass_transfer?: _waves_events_TransactionMetadata_MassTransferMetadata | null;
    invoke_script?: _waves_events_TransactionMetadata_InvokeScriptMetadata | null;
    lease?: _waves_events_TransactionMetadata_LeaseMetadata | null;
    ethereum?: _waves_events_TransactionMetadata_EthereumMetadata | null;
    metadata?: 'transfer' | 'exchange' | 'mass_transfer' | 'invoke_script' | 'lease' | 'ethereum';
}

export interface TransactionMetadata__Output {
    sender_address?: Buffer;
    transfer?: _waves_events_TransactionMetadata_TransferMetadata__Output;
    exchange?: _waves_events_TransactionMetadata_ExchangeMetadata__Output;
    mass_transfer?: _waves_events_TransactionMetadata_MassTransferMetadata__Output;
    invoke_script?: _waves_events_TransactionMetadata_InvokeScriptMetadata__Output;
    lease?: _waves_events_TransactionMetadata_LeaseMetadata__Output;
    ethereum?: _waves_events_TransactionMetadata_EthereumMetadata__Output;
}
