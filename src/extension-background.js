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
        console.log(`Background received ${FETCH_MESSAGES_ACTION} action`);
        const BASE_URL = "https://b73efe21c6c4.ngrok-free.app";
        const getReviewsRequest = new URL(`${BASE_URL}/reviews`);

        getReviewsRequest.searchParams.append("windowHref", sender.url);

        console.log("Fetching reviews", { getReviewsRequest });

        // Using `return` doesn't seem to get send the response object (maybe because it can't be serialized, but no error shown)
        fetch(getReviewsRequest)
            .then(res => {

                if(res.ok) {
                    console.log("Background: reviews fetched successfully");

                    res.json().then(reviews => {
                        console.log("Background: reviews as JSON", reviews);

                        sendResponse({ reviews, windowHref: sender.url });
                    })
                }
            });
    }

    // This is needed to run an asynchronous task with `sendResponse` on both Firefox and Chrome
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_an_asynchronous_response_using_sendresponse
    return true;
});
