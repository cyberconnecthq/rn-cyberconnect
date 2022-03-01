"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearByAddr = exports.get = exports.set = exports.clear = void 0;
var async_storage_1 = __importDefault(
  require("@react-native-async-storage/async-storage")
);
var setASG = function (key, val) {
  return async_storage_1.default
    .setItem(key, JSON.stringify(val))
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      return err;
    });
};
var getASG = function (key) {
  return async_storage_1.default.getItem(key).then(function (data) {
    return JSON.parse(data);
  });
};
var clearASG = function () {
  return async_storage_1.default.clear();
};
var clearASGByKey = function (k) {
  return async_storage_1.default.removeItem(k);
};
var set = function () {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return setASG.apply(void 0, args);
};
exports.set = set;
var get = function (key) {
  return getASG(key);
};
exports.get = get;
var clear = function () {
  return clearASG();
};
exports.clear = clear;
var clearByAddr = function (key) {
  return clearASGByKey(key);
};
exports.clearByAddr = clearByAddr;
//# sourceMappingURL=DB.js.map
