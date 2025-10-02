
console.log("`extension-background.js` has ran!");

const FETCH_MESSAGES_ACTION = "fetchMessages"

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background script: onMessage");

    // Ignore messages from inactive tabs
    if(!sender.tab.active) {
        return;
    }

    console.log("Background script: sender:", sender)

    if (message.action === FETCH_MESSAGES_ACTION) {
        console.log(`Background received ${FETCH_MESSAGES_ACTION} action`);

        return true; // Indicates that sendResponse will be called asynchronously
    }
});
