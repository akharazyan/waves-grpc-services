import assert from 'assert';
import type { Long } from '@grpc/proto-loader';

import type { _waves_DataTransactionData_DataEntry } from '../types/proto/waves/DataTransactionData';
import { parseInteger } from './integer';

export const valueFromDataEntry = (
    kv: _waves_DataTransactionData_DataEntry,
): {
    value: string | number | Long | boolean;
    type: 'string' | 'boolean' | 'integer';
} => {
    if (kv.value === 'int_value') {
        assert(kv.int_value != null, 'int_value cannot be empty');
        return {
            type: 'integer',
            value: typeof kv.int_value === 'string' ? parseInteger(kv.int_value) : kv.int_value,
        };
    }
    if (kv.value === 'bool_value') {
        assert(kv.bool_value != null, 'bool_value cannot be empty');
        return {
            type: 'boolean',
            value: kv.bool_value,
        };
    }
    if (kv.value === 'string_value') {
        assert(kv.string_value != null, 'string_value cannot be empty');
        return {
            type: 'string',
            value: kv.string_value,
        };
    }

    assert(kv.binary_value != null, 'binary_value cannot be empty');
    return {
        value: kv.binary_value.toString(),
        type: 'string',
    };
};
