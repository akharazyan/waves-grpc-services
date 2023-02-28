// Original file: node_modules/@waves/protobuf-serialization/proto/waves/transaction.proto

import type {
    Transaction as _waves_Transaction,
    Transaction__Output as _waves_Transaction__Output,
} from '../waves/Transaction';

export interface SignedTransaction {
    waves_transaction?: _waves_Transaction | null;
    proofs?: (Buffer | Uint8Array | string)[];
    ethereum_transaction?: Buffer | Uint8Array | string;
    transaction?: 'waves_transaction' | 'ethereum_transaction';
}

export interface SignedTransaction__Output {
    waves_transaction?: _waves_Transaction__Output;
    proofs?: Buffer[];
    ethereum_transaction?: Buffer;
}
