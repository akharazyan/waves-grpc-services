// Original file: node_modules/@waves/protobuf-serialization/proto/waves/events/events.proto

import type {
    _waves_events_StateUpdate_AssetInfo,
    _waves_events_StateUpdate_AssetInfo__Output,
} from '../../waves/events/StateUpdate';
import type {
    TransactionMetadata as _waves_events_TransactionMetadata,
    TransactionMetadata__Output as _waves_events_TransactionMetadata__Output,
} from '../../waves/events/TransactionMetadata';
import type {
    StateUpdate as _waves_events_StateUpdate,
    StateUpdate__Output as _waves_events_StateUpdate__Output,
} from '../../waves/events/StateUpdate';
import type { Block as _waves_Block, Block__Output as _waves_Block__Output } from '../../waves/Block';
import type {
    SignedMicroBlock as _waves_SignedMicroBlock,
    SignedMicroBlock__Output as _waves_SignedMicroBlock__Output,
} from '../../waves/SignedMicroBlock';
import type { Long } from '@grpc/proto-loader';

export interface _waves_events_BlockchainUpdated_Append {
    block?: _waves_events_BlockchainUpdated_Append_BlockAppend | null;
    micro_block?: _waves_events_BlockchainUpdated_Append_MicroBlockAppend | null;
    transaction_ids?: (Buffer | Uint8Array | string)[];
    transactions_metadata?: _waves_events_TransactionMetadata[];
    state_update?: _waves_events_StateUpdate | null;
    transaction_state_updates?: _waves_events_StateUpdate[];
    body?: 'block' | 'micro_block';
}

export interface _waves_events_BlockchainUpdated_Append__Output {
    block?: _waves_events_BlockchainUpdated_Append_BlockAppend__Output;
    micro_block?: _waves_events_BlockchainUpdated_Append_MicroBlockAppend__Output;
    transaction_ids?: Buffer[];
    transactions_metadata?: _waves_events_TransactionMetadata__Output[];
    state_update?: _waves_events_StateUpdate__Output;
    transaction_state_updates?: _waves_events_StateUpdate__Output[];
}

export interface _waves_events_BlockchainUpdated_Append_BlockAppend {
    block?: _waves_Block | null;
    updated_waves_amount?: number | string | Long;
}

export interface _waves_events_BlockchainUpdated_Append_BlockAppend__Output {
    block?: _waves_Block__Output;
    updated_waves_amount?: string;
}

export interface _waves_events_BlockchainUpdated_Append_MicroBlockAppend {
    micro_block?: _waves_SignedMicroBlock | null;
    updated_transactions_root?: Buffer | Uint8Array | string;
}

export interface _waves_events_BlockchainUpdated_Append_MicroBlockAppend__Output {
    micro_block?: _waves_SignedMicroBlock__Output;
    updated_transactions_root?: Buffer;
}

export interface _waves_events_BlockchainUpdated_Rollback {
    type?:
        | _waves_events_BlockchainUpdated_Rollback_RollbackType
        | keyof typeof _waves_events_BlockchainUpdated_Rollback_RollbackType;
    removed_transaction_ids?: (Buffer | Uint8Array | string)[];
    removed_blocks?: _waves_Block[];
    rollback_state_update?: _waves_events_StateUpdate | null;
}

export interface _waves_events_BlockchainUpdated_Rollback__Output {
    type?: keyof typeof _waves_events_BlockchainUpdated_Rollback_RollbackType;
    removed_transaction_ids?: Buffer[];
    removed_blocks?: _waves_Block__Output[];
    rollback_state_update?: _waves_events_StateUpdate__Output;
}

// Original file: node_modules/@waves/protobuf-serialization/proto/waves/events/events.proto

export enum _waves_events_BlockchainUpdated_Rollback_RollbackType {
    BLOCK = 0,
    MICROBLOCK = 1,
}

export interface BlockchainUpdated {
    id?: Buffer | Uint8Array | string;
    height?: number;
    append?: _waves_events_BlockchainUpdated_Append | null;
    rollback?: _waves_events_BlockchainUpdated_Rollback | null;
    referenced_assets?: _waves_events_StateUpdate_AssetInfo[];
    update?: 'append' | 'rollback';
}

export interface BlockchainUpdated__Output {
    id?: Buffer;
    height?: number;
    append?: _waves_events_BlockchainUpdated_Append__Output;
    rollback?: _waves_events_BlockchainUpdated_Rollback__Output;
    referenced_assets?: _waves_events_StateUpdate_AssetInfo__Output[];
}
