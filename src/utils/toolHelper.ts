import html2canvas from 'html2canvas';

/**
 * Handle text initials on the avatar
 *
 * @param name - Operation name
 */
export function stringAvatar(name: string) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
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
