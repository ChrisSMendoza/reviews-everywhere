// TODO: Fix Uncaught SyntaxError: import declarations may only appear at top level of a module

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
        // console.log("Fetching reviews", { getReviewsRequest });

        // Don't seem to get the response object back..
        // return fetch(getReviewsRequest);

        sendResponse({ baseURL: BASE_URL, windowHref: sender.url });
    }

    // This is needed to run an asynchronous task with `sendResponse` on both Firefox and Chrome
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_an_asynchronous_response_using_sendresponse
    return true;
});
