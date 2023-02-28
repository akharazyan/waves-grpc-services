// Original file: node_modules/@waves/protobuf-serialization/proto/waves/invoke_script_result.proto

import type {
    _waves_DataTransactionData_DataEntry,
    _waves_DataTransactionData_DataEntry__Output,
} from '../waves/DataTransactionData';
import type { Amount as _waves_Amount, Amount__Output as _waves_Amount__Output } from '../waves/Amount';
import type { Recipient as _waves_Recipient, Recipient__Output as _waves_Recipient__Output } from '../waves/Recipient';
import type {
    InvokeScriptResult as _waves_InvokeScriptResult,
    InvokeScriptResult__Output as _waves_InvokeScriptResult__Output,
} from '../waves/InvokeScriptResult';
import type { Long } from '@grpc/proto-loader';

export interface _waves_InvokeScriptResult_Call_Argument {
    integer_value?: number | string | Long;
    binary_value?: Buffer | Uint8Array | string;
    string_value?: string;
    boolean_value?: boolean;
    case_obj?: Buffer | Uint8Array | string;
    list?: _waves_InvokeScriptResult_Call_Argument_List | null;
    value?: 'integer_value' | 'binary_value' | 'string_value' | 'boolean_value' | 'case_obj' | 'list';
}

export interface _waves_InvokeScriptResult_Call_Argument__Output {
    integer_value?: string;
    binary_value?: Buffer;
    string_value?: string;
    boolean_value?: boolean;
    case_obj?: Buffer;
    list?: _waves_InvokeScriptResult_Call_Argument_List__Output;
}

export interface _waves_InvokeScriptResult_Burn {
    asset_id?: Buffer | Uint8Array | string;
    amount?: number | string | Long;
}

export interface _waves_InvokeScriptResult_Burn__Output {
    asset_id?: Buffer;
    amount?: string;
}

export interface _waves_InvokeScriptResult_Call {
    function?: string;
    args_bytes?: (Buffer | Uint8Array | string)[];
    args?: _waves_InvokeScriptResult_Call_Argument[];
}

export interface _waves_InvokeScriptResult_Call__Output {
    function?: string;
    args_bytes?: Buffer[];
    args?: _waves_InvokeScriptResult_Call_Argument__Output[];
}

export interface _waves_InvokeScriptResult_ErrorMessage {
    code?: number;
    text?: string;
}

export interface _waves_InvokeScriptResult_ErrorMessage__Output {
    code?: number;
    text?: string;
}

export interface _waves_InvokeScriptResult_Invocation {
    dApp?: Buffer | Uint8Array | string;
    call?: _waves_InvokeScriptResult_Call | null;
    payments?: _waves_Amount[];
    stateChanges?: _waves_InvokeScriptResult | null;
}

export interface _waves_InvokeScriptResult_Invocation__Output {
    dApp?: Buffer;
    call?: _waves_InvokeScriptResult_Call__Output;
    payments?: _waves_Amount__Output[];
    stateChanges?: _waves_InvokeScriptResult__Output;
}

export interface _waves_InvokeScriptResult_Issue {
    asset_id?: Buffer | Uint8Array | string;
    name?: string;
    description?: string;
    amount?: number | string | Long;
    decimals?: number;
    reissuable?: boolean;
    script?: Buffer | Uint8Array | string;
    nonce?: number | string | Long;
}

export interface _waves_InvokeScriptResult_Issue__Output {
    asset_id?: Buffer;
    name?: string;
    description?: string;
    amount?: string;
    decimals?: number;
    reissuable?: boolean;
    script?: Buffer;
    nonce?: string;
}

export interface _waves_InvokeScriptResult_Lease {
    recipient?: _waves_Recipient | null;
    amount?: number | string | Long;
    nonce?: number | string | Long;
    lease_id?: Buffer | Uint8Array | string;
}

export interface _waves_InvokeScriptResult_Lease__Output {
    recipient?: _waves_Recipient__Output;
    amount?: string;
    nonce?: string;
    lease_id?: Buffer;
}

export interface _waves_InvokeScriptResult_LeaseCancel {
    lease_id?: Buffer | Uint8Array | string;
}

export interface _waves_InvokeScriptResult_LeaseCancel__Output {
    lease_id?: Buffer;
}

export interface _waves_InvokeScriptResult_Call_Argument_List {
    items?: _waves_InvokeScriptResult_Call_Argument[];
}

export interface _waves_InvokeScriptResult_Call_Argument_List__Output {
    items?: _waves_InvokeScriptResult_Call_Argument__Output[];
}

export interface _waves_InvokeScriptResult_Payment {
    address?: Buffer | Uint8Array | string;
    amount?: _waves_Amount | null;
}

export interface _waves_InvokeScriptResult_Payment__Output {
    address?: Buffer;
    amount?: _waves_Amount__Output;
}

export interface _waves_InvokeScriptResult_Reissue {
    asset_id?: Buffer | Uint8Array | string;
    amount?: number | string | Long;
    is_reissuable?: boolean;
}

export interface _waves_InvokeScriptResult_Reissue__Output {
    asset_id?: Buffer;
    amount?: string;
    is_reissuable?: boolean;
}

export interface _waves_InvokeScriptResult_SponsorFee {
    min_fee?: _waves_Amount | null;
}

export interface _waves_InvokeScriptResult_SponsorFee__Output {
    min_fee?: _waves_Amount__Output;
}

export interface InvokeScriptResult {
    data?: _waves_DataTransactionData_DataEntry[];
    transfers?: _waves_InvokeScriptResult_Payment[];
    issues?: _waves_InvokeScriptResult_Issue[];
    reissues?: _waves_InvokeScriptResult_Reissue[];
    burns?: _waves_InvokeScriptResult_Burn[];
    error_message?: _waves_InvokeScriptResult_ErrorMessage | null;
    sponsor_fees?: _waves_InvokeScriptResult_SponsorFee[];
    leases?: _waves_InvokeScriptResult_Lease[];
    lease_cancels?: _waves_InvokeScriptResult_LeaseCancel[];
    invokes?: _waves_InvokeScriptResult_Invocation[];
}

export interface InvokeScriptResult__Output {
    data?: _waves_DataTransactionData_DataEntry__Output[];
    transfers?: _waves_InvokeScriptResult_Payment__Output[];
    issues?: _waves_InvokeScriptResult_Issue__Output[];
    reissues?: _waves_InvokeScriptResult_Reissue__Output[];
    burns?: _waves_InvokeScriptResult_Burn__Output[];
    error_message?: _waves_InvokeScriptResult_ErrorMessage__Output;
    sponsor_fees?: _waves_InvokeScriptResult_SponsorFee__Output[];
    leases?: _waves_InvokeScriptResult_Lease__Output[];
    lease_cancels?: _waves_InvokeScriptResult_LeaseCancel__Output[];
    invokes?: _waves_InvokeScriptResult_Invocation__Output[];
}
