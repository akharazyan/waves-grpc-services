import type { IParseOptions, IConversionOptions } from 'protobufjs';
import { loadSync } from '@grpc/proto-loader';
import { loadPackageDefinition } from '@grpc/grpc-js';

const loadProto = <T extends object>(
    path: string | string[],
    options: (IParseOptions & IConversionOptions) | { includeDirs: string[] } = {},
): T => {
    const packageDefinition = loadSync(path, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        ...options,
    });

    return loadPackageDefinition(packageDefinition) as T;
};

export default loadProto;
