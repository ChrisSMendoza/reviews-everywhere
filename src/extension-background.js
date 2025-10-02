
console.log("`extension-background.js` has ran!");


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background script: onMessage");

    // Ignore messages from inactive tabs
    if(!sender.tab.active) {
        return;
    }

    console.log("Background script: sender:", sender)

    if (message.action === "fetchData") {
        console.log("Background received fetchData message");

        return true; // Indicates that sendResponse will be called asynchronously
    }
});
