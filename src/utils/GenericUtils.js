/**
 * helpers to copy something to user's clipboard
 */

export function copyMe(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => console.info("copied to clipboard"))
    .catch((err) => {
      console.error(`Failed to copy text to clipboard: ${err}`);
    });
}


