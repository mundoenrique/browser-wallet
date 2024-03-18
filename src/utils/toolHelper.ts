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
    console.error('Error copying text:', error);
  }
};
