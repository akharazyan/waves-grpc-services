// Original file: node_modules/@waves/protobuf-serialization/proto/waves/node/grpc/accounts_api.proto

export interface BalancesRequest {
    address?: Buffer | Uint8Array | string;
    assets?: (Buffer | Uint8Array | string)[];
}

export interface BalancesRequest__Output {
    address?: Buffer;
    assets?: Buffer[];
}
