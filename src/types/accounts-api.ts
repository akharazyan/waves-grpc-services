import type { Long } from '@grpc/proto-loader';

export interface StateData {
    key: string;
    type: 'string' | 'integer' | 'boolean';
    value: string | number | boolean | Long;
}

export interface IDataStateApi {
    getStatus(): string;
    fetchState(address: string): Promise<StateData[]>;
}
