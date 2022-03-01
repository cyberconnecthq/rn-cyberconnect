import { Blockchain } from "./types";
export declare type Query = "connect" | "disconnect";
declare type RegisterSigningKeyInput = {
  address: string;
  message: string;
  signature: string;
  network: string;
};
declare type UpdateConnectionInput = {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: string;
  operation: string;
  signingKey: string;
  alias: string;
  network: string;
};
declare type BatchUpdateConnectionInput = {
  fromAddr: string;
  signingInputs: {
    toAddr: string;
    signature: string;
    operation: string;
  }[];
  namespace: string;
  signingKey: string;
  network: string;
};
export declare const registerSigningKeySchema: (
  input: RegisterSigningKeyInput
) => {
  operationName: string;
  query: string;
  variables: {
    input: RegisterSigningKeyInput;
  };
};
export declare const connectQuerySchema: (input: UpdateConnectionInput) => {
  operationName: string;
  query: string;
  variables: {
    input: UpdateConnectionInput;
  };
};
export declare const batchConnectQuerySchema: (
  input: BatchUpdateConnectionInput
) => {
  operationName: string;
  query: string;
  variables: {
    input: BatchUpdateConnectionInput;
  };
};
export declare const disconnectQuerySchema: (input: UpdateConnectionInput) => {
  operationName: string;
  query: string;
  variables: {
    input: UpdateConnectionInput;
  };
};
export declare const setAliasQuerySchema: (input: UpdateConnectionInput) => {
  operationName: string;
  query: string;
  variables: {
    input: UpdateConnectionInput;
  };
};
export declare const authSchema: ({
  address,
  signature,
  network,
}: {
  address: string;
  signature: string;
  network: Blockchain;
}) => {
  operationName: string;
  query: string;
  variables: {
    address: string;
    signature: string;
    network: Blockchain;
  };
};
export declare const querySchemas: {
  connect: (input: UpdateConnectionInput) => {
    operationName: string;
    query: string;
    variables: {
      input: UpdateConnectionInput;
    };
  };
  batchConnect: (input: BatchUpdateConnectionInput) => {
    operationName: string;
    query: string;
    variables: {
      input: BatchUpdateConnectionInput;
    };
  };
  disconnect: (input: UpdateConnectionInput) => {
    operationName: string;
    query: string;
    variables: {
      input: UpdateConnectionInput;
    };
  };
  auth: ({
    address,
    signature,
    network,
  }: {
    address: string;
    signature: string;
    network: Blockchain;
  }) => {
    operationName: string;
    query: string;
    variables: {
      address: string;
      signature: string;
      network: Blockchain;
    };
  };
  setAlias: (input: UpdateConnectionInput) => {
    operationName: string;
    query: string;
    variables: {
      input: UpdateConnectionInput;
    };
  };
  registerSigningKey: (input: RegisterSigningKeyInput) => {
    operationName: string;
    query: string;
    variables: {
      input: RegisterSigningKeyInput;
    };
  };
};
export declare const request: (url?: string, data?: {}) => Promise<any>;
export declare const handleQuery: (
  data: {
    query: string;
    variables: object;
    operationName: string;
  },
  url: string
) => Promise<any>;
export declare const registerSigningKey: ({
  address,
  message,
  signature,
  network,
  url,
}: RegisterSigningKeyInput & {
  url: string;
}) => Promise<any>;
export declare const auth: ({
  address,
  signature,
  network,
  url,
}: {
  address: string;
  signature: string;
  network: Blockchain;
  url: string;
}) => Promise<any>;
export declare const follow: (
  input: UpdateConnectionInput,
  url: string
) => Promise<any>;
export declare const batchFollow: (
  input: BatchUpdateConnectionInput,
  url: string
) => Promise<any>;
export declare const unfollow: (
  input: UpdateConnectionInput,
  url: string
) => Promise<any>;
export declare const setAlias: (
  input: UpdateConnectionInput,
  url: string
) => Promise<any>;
export {};
//# sourceMappingURL=queries.d.ts.map
