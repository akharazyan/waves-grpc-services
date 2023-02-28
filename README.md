# Waves gRPC clients services

## Installation

If you are using npm:

```shell
npm i waves-grpc-services-client
```

If you are using yarn:

```shell
yarn add waves-grpc-services-client
```

[//]: # (## Usage)

[//]: # ()
[//]: # (### Blockchain Updates)

[//]: # ()
[//]: # (#### Builder methods)

[//]: # (`buAddress&#40;string&#41;` &#40;**required**&#41; )

[//]: # ()
[//]: # (`label&#40;string&#41;` used only for logging to distinguish one stream from another )

## Examples

### Blockchain Updates

```js
import { BlockchainUpdates } from 'waves-grpc-services-client';

const blockchainUpdatesBuilder = BlockchainUpdates.builder();

const blockchainUpdates = blockchainUpdatesBuilder
    .buAddress('grpc.wavesnodes.com:6881')
    .from(3528000)
    .to(3528050)
    .onData(({ height }) => {
        console.log(height);
    })
    .build();

blockchainUpdates.start();
```

### AccountsApi

```js
import { AccountsApi } from 'waves-grpc-services-client';

const accountsApi = new AccountsApi();

accountsApi.fetchState('3P8qJyxUqizCWWtEn2zsLZVPzZAjdNGppB1').then((entries) => {
    // do something
});
```
