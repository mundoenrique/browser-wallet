import CryptoJS from 'crypto-js';

export const encrypt = ({
  data,
  secret = process.env.NEXT_PUBLIC_SECRET_KEY || '',
  safety = process.env.NEXT_PUBLIC_ACTIVE_SAFETY,
}: any & string) => {
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
}: any & string) => {
  if (safety === 'ON') {
    const key = CryptoJS.enc.Base64.parse(secret);
    const iv = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_SECRET_IV || '');
    var bytes = CryptoJS.AES.decrypt(data, key, { iv });
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
  return data;
};
