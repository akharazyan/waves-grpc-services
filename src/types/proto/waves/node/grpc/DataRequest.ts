// Original file: node_modules/@waves/protobuf-serialization/proto/waves/node/grpc/accounts_api.proto

export interface DataRequest {
    address?: Buffer | Uint8Array | string;
    key?: string;
}

export interface DataRequest__Output {
    address?: Buffer;
    key?: string;
}
