
console.log("`extension-background.js` has ran!");


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === "fetchData") {
    console.log("Background received fetchData message");

    return true; // Indicates that sendResponse will be called asynchronously
  }
});
