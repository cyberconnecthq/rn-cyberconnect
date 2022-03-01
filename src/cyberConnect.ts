import { endpoints } from './network';
import {
  follow,
  batchFollow,
  registerSigningKey,
  setAlias,
  unfollow,
} from './queries';
import { ConnectError, ErrorCode } from './error';
import {
  Blockchain,
  Config,
  Endpoint,
  Operation,
  CLIENT_TYPE,
} from './types';
import { getAddressByProvider, getSigningKeySignature } from './utils';
import { Env } from '.';
import {
  clearSigningKey,
  getPublicKey,
  hasSigningKey,
  signWithSigningKey,
  clearSigningKeyByAddress,
} from './crypto';


class CyberConnect {
  address: string = '';
  namespace: string;
  endpoint: Endpoint;
  chain: Blockchain = Blockchain.ETH;
  chainRef: string = '';
  provider: any = null;
  signingMessageEntity: string | undefined = '';
  constructor(config: Config) {
    const {
      provider,
      namespace,
      env,
      chainRef,
      chain,
      clientType = CLIENT_TYPE.WEB,
      signingMessageEntity = '',
    } = config;

    if (!namespace) {
      throw new ConnectError(ErrorCode.EmptyNamespace);
    }

    this.namespace = namespace;
    this.endpoint = endpoints[env || Env.PRODUCTION];
    this.chain = chain || Blockchain.ETH;
    this.chainRef = chainRef || '';
    this.provider = provider;
    this.signingMessageEntity = signingMessageEntity;
  }

  async connect(targetAddr: string, alias: string = '') {
    try {
      this.address = await this.getAddress();
      await this.authWithSigningKey();

      const operation: Operation = {
        name: 'follow',
        from: this.address,
        to: targetAddr,
        namespace: this.namespace,
        network: this.chain,
        alias,
        timestamp: Date.now(),
      };

      const signature = await signWithSigningKey(
        JSON.stringify(operation),
        this.address,
      );
      const publicKey = await getPublicKey(this.address);

      const params = {
        fromAddr: this.address,
        toAddr: targetAddr,
        alias,
        namespace: this.namespace,
        signature,
        signingKey: publicKey,
        operation: JSON.stringify(operation),
        network: this.chain,
      };

      const resp = await follow(params, this.endpoint.cyberConnectApi);

      if (resp?.data?.connect.result === 'INVALID_SIGNATURE') {
        await clearSigningKey();

        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.connect.result,
        );
      }

      if (resp?.data?.connect.result !== 'SUCCESS') {
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.connect.result,
        );
      }
    } catch (e: any) {
      throw new ConnectError(ErrorCode.GraphqlError, e.message || e);
    }
  }

  async batchConnect(targetAddrs: string[]) {
    try {
      this.address = await this.getAddress();
      await this.authWithSigningKey();

      const timestamp = Date.now();
      const signPromises: Promise<{
        toAddr: string;
        signature: string;
        operation: string;
      }>[] = [];

      targetAddrs.forEach((addr) => {
        const operation: Operation = {
          name: 'follow',
          from: this.address,
          to: addr,
          namespace: this.namespace,
          network: this.chain,
          timestamp,
        };

        signPromises.push(
          new Promise(async (resolve) => {
            const signature = await signWithSigningKey(
              JSON.stringify(operation),
              this.address,
            );
            resolve({
              toAddr: addr,
              signature,
              operation: JSON.stringify(operation),
            });
          }),
        );
      });

      const signingInputs = await Promise.all(signPromises);
      const publicKey = await getPublicKey(this.address);

      const params = {
        fromAddr: this.address,
        namespace: this.namespace,
        signingInputs,
        signingKey: publicKey,
        network: this.chain,
      };

      const resp = await batchFollow(params, this.endpoint.cyberConnectApi);

      if (resp?.data?.batchConnect.result === 'INVALID_SIGNATURE') {
        await clearSigningKey();

        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.batchConnect.result,
        );
      }

      if (resp?.data?.batchConnect.result !== 'SUCCESS') {
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.batchConnect.result,
        );
      }

      return resp?.data?.batchConnect;
    } catch (e: any) {
      throw new ConnectError(ErrorCode.GraphqlError, e.message || e);
    }
  }

  async disconnect(targetAddr: string, alias: string = '') {
    try {
      this.address = await this.getAddress();
      await this.authWithSigningKey();

      const operation: Operation = {
        name: 'unfollow',
        from: this.address,
        to: targetAddr,
        namespace: this.namespace,
        network: this.chain,
        alias,
        timestamp: Date.now(),
      };

      const signature = await signWithSigningKey(
        JSON.stringify(operation),
        this.address,
      );
      const publicKey = await getPublicKey(this.address);

      const params = {
        fromAddr: this.address,
        toAddr: targetAddr,
        alias,
        namespace: this.namespace,
        signature,
        signingKey: publicKey,
        operation: JSON.stringify(operation),
        network: this.chain,
      };

      // const sign = await this.signWithJwt();

      const resp = await unfollow(params, this.endpoint.cyberConnectApi);

      if (resp?.data?.disconnect.result === 'INVALID_SIGNATURE') {
        await clearSigningKey();

        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.disconnect.result,
        );
      }

      if (resp?.data?.disconnect.result !== 'SUCCESS') {
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.disconnect.result,
        );
      }
    } catch (e: any) {
      throw new ConnectError(ErrorCode.GraphqlError, e.message || e);
    }
  }

  async setAlias(targetAddr: string, alias: string = '') {
    try {
      this.address = await this.getAddress();
      await this.authWithSigningKey();

      const operation: Operation = {
        name: 'follow',
        from: this.address,
        to: targetAddr,
        namespace: this.namespace,
        network: this.chain,
        alias,
        timestamp: Date.now(),
      };

      const signature = await signWithSigningKey(
        JSON.stringify(operation),
        this.address,
      );
      const publicKey = await getPublicKey(this.address);

      const params = {
        fromAddr: this.address,
        toAddr: targetAddr,
        alias,
        namespace: this.namespace,
        signature,
        signingKey: publicKey,
        operation: JSON.stringify(operation),
        network: this.chain,
      };

      // const sign = await this.signWithJwt();

      const resp = await setAlias(params, this.endpoint.cyberConnectApi);

      if (resp?.data?.alias.result === 'INVALID_SIGNATURE') {
        await clearSigningKey();
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.alias.result,
        );
      }

      if (resp?.data?.alias.result !== 'SUCCESS') {
        throw new ConnectError(
          ErrorCode.GraphqlError,
          resp?.data?.alias.result,
        );
      }
    } catch (e: any) {
      throw new ConnectError(ErrorCode.GraphqlError, e.message || e);
    }

  }

  async getAddress() {
    if (this.address) {
      return this.address;
    }
    return (this.address = await getAddressByProvider(
      this.provider,
      this.chain,
    ));
  }

  async authWithSigningKey() {
    if (await hasSigningKey(this.address)) {
      return;
    }

    const publicKey = await getPublicKey(this.address);
    const acknowledgement = `I authorize ${
      this.signingMessageEntity || 'CyberConnect'
    } from this device using signing key:\n`;
    const message = `${acknowledgement}${publicKey}`;

    this.address = await this.getAddress();
    try {
      const signingKeySignature = await getSigningKeySignature(
        this.provider,
        this.chain,
        message,
        this.address,
      );
      if (signingKeySignature) {
        const resp = await registerSigningKey({
          address: this.address,
          signature: signingKeySignature,
          message,
          network: this.chain,
          url: this.endpoint.cyberConnectApi,
        });

        if (resp?.data?.registerKey.result !== 'SUCCESS') {
          throw new ConnectError(
            ErrorCode.GraphqlError,
            resp?.data?.alias.result,
          );
        }
      } else {
        throw new Error('signingKeySignature is empty');
      }
    } catch (e) {
      clearSigningKeyByAddress(this.address);
      throw new Error('User cancel the sign process');
    }
  }
}

export default CyberConnect;
