import CryptoJS from 'crypto-js';
//Internal app
import { ramdomData, log_message } from '@/utils/toolHelpers';

export const encrypt = ({
  data,
  secret = process.env.NEXT_PUBLIC_SECRET_KEY || '',
  safety = process.env.NEXT_PUBLIC_ACTIVE_SAFETY,
}: any) => {
  if (safety === 'ON') {
    const key = CryptoJS.enc.Base64.parse(secret);
    const iv = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_SECRET_IV || '');
    var ciphertext = CryptoJS.AES.encrypt(data, key, { iv });
    return ciphertext.toString();
  }

  return data;
};

export const decrypt = ({
  data,
  secret = process.env.NEXT_PUBLIC_SECRET_KEY || '',
  safety = process.env.NEXT_PUBLIC_ACTIVE_SAFETY,
}: any) => {
  if (safety === 'ON') {
    const key = CryptoJS.enc.Base64.parse(secret);
    const iv = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_SECRET_IV || '');
    var bytes = CryptoJS.AES.decrypt(data, key, { iv });
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
  return data;
};

export const encryptToView = (request: { code: number; payload: string } | { code: number; msg: string }) => {
  try {
    const decode = ramdomData(22).toString();
    const reqData = process.env.NEXT_PUBLIC_ACTIVE_SAFETY === 'ON' ? JSON.stringify(request) : request;
    const encryptData = encrypt({ data: reqData, secret: decode });
    const encryptResponse = {
      payload: encryptData,
      code: decode,
    };
    const resData = process.env.NEXT_PUBLIC_ACTIVE_SAFETY === 'ON' ? JSON.stringify(encryptResponse) : encryptResponse;
    const response = encrypt({ data: resData });
    return response;
  } catch (e) {
    log_message('error', `Error encrypt to view ${e}`);
  }
};
