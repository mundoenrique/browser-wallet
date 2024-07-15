import forge from 'node-forge';
import html2canvas from 'html2canvas';

/**
 * Handle text initials on the avatar
 *
 * @param name - Operation name
 */
export function stringAvatar(name: string) {
  const breakName = name.split(' ');
  const initials = breakName.map((part) => part[0]).splice(0, 2);
  return {
    children: initials.join(''),
  };
}

/**
 * Handles the download of an image based on the specified parameters.
 *
 * @param element - The HTML element to be captured as an image.
 * @param downloadName - The name of the downloaded file.
 * @param backgroundColor - The background color for the captured image.
 */
export const handleDownload = async (element: HTMLElement, fileName: string, backgroundColor: string) => {
  const canvas = await html2canvas(element, {
    removeContainer: false,
    allowTaint: true,
    backgroundColor: backgroundColor,
    scale: 1.5,
  });
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = fileName;
  link.click();
};

/**
 * Handles the sharing of an image based on the specified parameters.
 *
 * @param element - The HTML element to be captured as an image.
 * @param shareData - The data to be shared, including the URL and files.
 * @param backgroundColor - The background color for the captured image.
 */
export const handleShare = async (element: HTMLElement, shareData: any, backgroundColor: string) => {
  const webShareSupported = 'canShare' in navigator;

  try {
    const canvas = await html2canvas(element, {
      removeContainer: false,
      allowTaint: true,
      backgroundColor: backgroundColor,
      scale: 1.5,
    });
    if (webShareSupported) {
      const blob: Blob = await new Promise((resolve: any) => canvas.toBlob(resolve, 'image/png'));
      const file: File = new File([blob], 'cobro.png', { type: 'image/png' });
      shareData['files'].push(file);
      await navigator.share(shareData);
    } else {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'ticket.png';
      link.click();
    }
  } catch (err) {
    console.error(err);
  }
};

export const encryptForge = (data: any) => {
  const key: string = process.env.NEXT_PUBLIC_AES_KEY ?? '';

  const iv = new Uint8Array(16);

  let buffer = forge.util.createBuffer(iv, 'raw');

  const cipher = forge.cipher.createCipher('AES-CBC', key);

  cipher.start({ iv: buffer });

  cipher.update(forge.util.createBuffer(data, 'utf8'));

  cipher.finish();

  const encryptedData = forge.util.encode64(cipher.output.getBytes());

  return encryptedData;
};

export const decryptForge = (encryptedData: any) => {
  const key: string = process.env.NEXT_PUBLIC_AES_KEY ?? '';

  const iv = new Uint8Array(16);

  let buffer = forge.util.createBuffer(iv, 'raw');

  const decipher = forge.cipher.createDecipher('AES-CBC', key);

  const rawData = forge.util.decode64(encryptedData);

  decipher.start({ iv: buffer });

  decipher.update(forge.util.createBuffer(rawData, 'raw'));

  decipher.finish();

  const decryptedData = decipher.output.toString();

  return decryptedData;
};

export const setDataRedis = async (method: string, data = {}) => {

  const encryptData = encryptForge(JSON.stringify(data))
  const response = await fetch(process.env.NEXT_PUBLIC_WEB_URL + '/api/v1/redis', {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({data:encryptData})
  });
  return response.json();
}

/**
 * Manages the masking of the phone number for sending the otp
 *
 * @param phone - Phone to mask
 */
export const handleMaskOtp = (phone: string) => {
  const maskPhone = phone.substring(phone.length - 4);
  return maskPhone;
};

/**
 * Format time second
 * @param seconds
 * @returns
 */
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Format amount
 * @param amount
 * @returns
 */
export const formatAmount = (amount: string) => {
  return parseFloat(amount).toFixed(2);
};


export const validateTime = (timeSession: number, dateSession:string) => {

  const date = new Date(dateSession).getTime();
  const now = new Date().getTime();
  const time: number = Math.trunc(Math.abs((date - now) / 1000));
  const timeRest: number = timeSession - time;

  return timeRest
}
