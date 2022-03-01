"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_TYPE = exports.Env = exports.Blockchain = void 0;
var Blockchain;
(function (Blockchain) {
  Blockchain["ETH"] = "ETH";
  Blockchain["SOLANA"] = "SOLANA";
})((Blockchain = exports.Blockchain || (exports.Blockchain = {})));
var Env;
(function (Env) {
  Env["STAGING"] = "STAGING";
  Env["PRODUCTION"] = "PRODUCTION";
})((Env = exports.Env || (exports.Env = {})));
var CLIENT_TYPE;
(function (CLIENT_TYPE) {
  CLIENT_TYPE["WEB"] = "WEB";
  CLIENT_TYPE["RN"] = "RN";
})((CLIENT_TYPE = exports.CLIENT_TYPE || (exports.CLIENT_TYPE = {})));
//# sourceMappingURL=types.js.map
