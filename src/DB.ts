
import AsyncStorage from '@react-native-async-storage/async-storage';


const setASG = (key: string, val: CryptoKeyPair) =>
  AsyncStorage.setItem(key, JSON.stringify(val))
    .then((data:any) => data)
    .catch((err:Error) => err);

const getASG = (key: string) =>
  AsyncStorage.getItem(key).then((data: any) => JSON.parse(data));

const clearASG = () => AsyncStorage.clear();

const clearASGByKey = (k: string) => AsyncStorage.removeItem(k);





const set = (...args: [string, CryptoKeyPair]) =>setASG(...args);

const get = (key: string) => getASG(key)

const clear = () => clearASG();

const clearByAddr = (key: string) => clearASGByKey(key);

export { clear, set, get, clearByAddr };
