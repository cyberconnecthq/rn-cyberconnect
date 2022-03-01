export interface Connection {
  connectionType: string;
  target: string;
  namespace: string;
  createdAt: string;
  alias: string;
}

export type Connections = Connection[];

export enum Blockchain {
  ETH = 'ETH',
  SOLANA = 'SOLANA',
}

export interface CyberConnectStore {
  outboundLink: Connections;
}

export interface ConfigBase {
  namespace: string;
  env?: keyof typeof Env;
  provider: any;
  clientType?: CLIENT_TYPE.RN | CLIENT_TYPE.WEB;
  signingMessageEntity?: string;
}

export interface ConfigEth {
  chain?: Blockchain.ETH;
  chainRef?: never;
}


export type Config = ConfigBase & (ConfigEth);

export enum Env {
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}

export interface Endpoint {
  ceramicUrl: string;
  cyberConnectSchema: string;
  cyberConnectApi: string;
}

export type OperationName = 'follow' | 'unfollow';

export interface Operation {
  name: OperationName;
  from: string;
  to: string;
  namespace: string;
  network: Blockchain;
  alias?: string;
  timestamp: number;
}

export enum CLIENT_TYPE {
  WEB = 'WEB',
  RN = 'RN',
}
