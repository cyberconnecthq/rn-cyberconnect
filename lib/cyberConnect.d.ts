import { Blockchain, Config, Endpoint } from "./types";
declare class CyberConnect {
  address: string;
  namespace: string;
  endpoint: Endpoint;
  chain: Blockchain;
  chainRef: string;
  provider: any;
  signingMessageEntity: string | undefined;
  constructor(config: Config);
  connect(targetAddr: string, alias?: string): Promise<void>;
  batchConnect(targetAddrs: string[]): Promise<any>;
  disconnect(targetAddr: string, alias?: string): Promise<void>;
  setAlias(targetAddr: string, alias?: string): Promise<void>;
  getAddress(): Promise<any>;
  authWithSigningKey(): Promise<void>;
}
export default CyberConnect;
//# sourceMappingURL=cyberConnect.d.ts.map
