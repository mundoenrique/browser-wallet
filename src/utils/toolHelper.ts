import forge from 'node-forge';
import html2canvas from 'html2canvas';

/**
 * Handle text initials on the avatar
 *
 * @param name - Operation name
 */
export function stringAvatar(name: string) {
  const breakName = name.split(' ');

  return {
    children: `${breakName[0][0] ?? ''}${breakName[1][0] ?? ''}`,
  };
}

/**
 * Copies the specified text to the clipboard using the `navigator.clipboard.writeText` method.
 *
 * @param text - The text to be copied to the clipboard.
 */
export const copyToClipboard = async (text: any) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // console.error('Error copying text:', error);
  }
};

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
  const key: string = process.env.NEXT_PUBLIC_AES_KEY || '';

  const iv = new Uint8Array(16);

  var buffer = forge.util.createBuffer(iv, 'raw');

  const cipher = forge.cipher.createCipher('AES-CBC', key);

  cipher.start({ iv: buffer });

  cipher.update(forge.util.createBuffer(data, 'utf8'));

  cipher.finish();

  const encryptedData = forge.util.encode64(cipher.output.getBytes());

  return encryptedData;
};

export const decryptForge = (encryptedData: any) => {
  const key: string = process.env.NEXT_PUBLIC_AES_KEY || '';

  const iv = new Uint8Array(16);

  var buffer = forge.util.createBuffer(iv, 'raw');

  const decipher = forge.cipher.createDecipher('AES-CBC', key);

  const rawData = forge.util.decode64(encryptedData);

  decipher.start({ iv: buffer });

  decipher.update(forge.util.createBuffer(rawData, 'raw'));

  decipher.finish();

  const decryptedData = decipher.output.toString();

  return decryptedData;
};

/**
 * Manages the masking of the phone number for sending the otp
 *
 * @param phone - Phone to mask
 */
export const handleMaskOtp = (phone: string) => {
  const maskPhone = phone.substring(phone.length - 4);
  return maskPhone;
};
