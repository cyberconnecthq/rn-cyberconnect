# CyberConnect

The JavaScript library which implement with react-native provides `CyberConnect` class which includes functions to allows users to control their decentralized identity([DIDs](https://www.w3.org/TR/did-core/)) and social graph data. The library encapsulates the complex authentication logic (authenticate to Ceramic Network) into easy-to-use functions.
[CyberConnect API](https://docs.cyberconnect.me/connect-and-disconnect).

See also the [CyberConnect](https://github.com/cyberconnecthq/js-cyberconnect).

## Getting started

### Installation

```sh
npm install @cyberlab/cyberconnect-rn
or
yarn add @cyberlab/cyberconnect-rn
```

### Preparation

Add `window.crypto.subtle` to your React Native application.It does this by communicating with a hidden WebView, which performs the actual computation.
Refer to the [`react-native-webview-crypto`](https://github.com/webview-crypto/react-native-webview-crypto) repo for most of the code and some caveats.

Rendering the PolyfillCrypto will start up a WebView to transparently proxy all the crypto calls to.

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';

import App from './app';

import { PolyfillCrypto } from '@cyberlab/cyberconnect-rn';

class TopLevelComponent extends Component {
  render() {
    return (
      <View>
        <PolyfillCrypto />
        <App />
      </View>
    );
  }
}

AppRegistry.registerComponent('WhateverName', () => TopLevelComponent);
```

### Basic usage

#### Init CyberConnect

```ts
import CyberConnect, {
  Env,
  Blockchain,
} from 'npm install @cyberlab/cyberconnect-rn';

const cyberConnect = new CyberConnect({
  namespace: 'CyberConnect',
  env: Env.Production,
  chain: Blockchain.ETH,
  provider: provider,
  signingMessageEntity: 'CyberConnect' || your entity,
});
```

- `namespace` - Your applciation name.
- `env` - (optional) Env decides the endpoints. Now we have `staging` and `production`. (The default value is `Env.Production`).
- `chain` - (optional) The blockchain you want to connect with. Now we only support `ethereum`.
- `provider` - The corresponding provider of the given chain.
- `signingMessageEntity` - (optional) Use to describe the entity users sign their message with. Users will see it when authorizing in the wallet `I authorize ${signingMessageEntity} from this device using signing key:`. The default entity is `CyberConnect`.

#### Connect

```ts
cyberConnect.connect(targetAddr, alias);
```

- `targetAddr` - The target wallet address to connect.
- `alias` - (optional) Alias for the target address.

#### Disconnect

```ts
cyberConnect.disconnect(targetAddr);
```

- `targetAddr` - The target wallet address to disconnect.

#### SetAlias

```ts
cyberConnect.setAlias(targetAddr, alias);
```

- `targetAddr` - The target wallet address to disconnect.
- `alias` - The alias for the target address.

## Contributing

We are happy to accept small and large contributions, feel free to make a suggestion or submit a pull request.
