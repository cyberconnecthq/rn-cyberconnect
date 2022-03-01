import { Blockchain } from './types';
import { hexlify } from '@ethersproject/bytes';
import { toUtf8Bytes } from '@ethersproject/strings';

export const encodeRpcMessage = (method: string, params?: any) => {
  return {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  };
};

export const getAddressByProvider = async (
  provider: any,
  chain: Blockchain,
) => {
  switch (chain) {
    case Blockchain.ETH: {
      // rn connector
        return provider.accounts[0];
    }
    default: {
      return '';
    }
  }
};

export const getSigningKeySignature = async (
  provider: any,
  chain: Blockchain,
  message: string,
  address: string,
) => {
  if (chain === Blockchain.ETH) {
    // rn connector
      return await provider.signPersonalMessage([
        hexlify(toUtf8Bytes(message)),
        address,
      ]);
  }else {
    return '';
  }
};

export const safeSend = (
  provider: any,
  method: string,
  params?: Array<any>,
): Promise<any> => {
  if (params == null) {
    params = [];
  }

  if (provider.request) {
    return provider.request({ method, params }).then(
      (response: any) => response,
      (error: any) => {
        throw error;
      },
    );
  } else if (provider.sendAsync || provider.send) {
    const sendFunc = (
      provider.sendAsync ? provider.sendAsync : provider.send
    ).bind(provider);
    const request = encodeRpcMessage(method, params);
    return new Promise((resolve, reject) => {
      sendFunc(request, (error: any, response: any) => {
        if (error) reject(error);

        if (response.error) {
          const error = new Error(response.error.message);
          (<any>error).code = response.error.code;
          (<any>error).data = response.error.data;
          reject(error);
        }

        resolve(response.result);
      });
    });
  } else {
    throw new Error(
      `Unsupported provider; provider must implement one of the following methods: send, sendAsync, request`,
    );
  }
};

