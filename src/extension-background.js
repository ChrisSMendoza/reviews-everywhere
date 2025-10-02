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
        console.log("Background: Fetching reviews");

        // TODO: Add catch here, can we just throw in fetchReviews?
        fetchReviews({ windowHref: sender.url })
            .then(reviews => sendResponse({ reviews }))

        // NOTE: Using `return` with response Promise doesn't seem to send it to client listener (maybe because it can't be serialized, but no error shown)
    }

    // This is needed to run an asynchronous task with `sendResponse` on both Firefox and Chrome
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_an_asynchronous_response_using_sendresponse
    return true;
});
// TODO: Revisit pattern, don't like that error isn't handled and we're giving back null. Throw instead?
async function fetchReviews(options) {
    const BASE_URL = "https://b73efe21c6c4.ngrok-free.app";
    const getReviewsRequest = new URL(`${BASE_URL}/reviews`);

    getReviewsRequest.searchParams.append("windowHref", options.windowHref);

    const reviewsResponse = await fetch(getReviewsRequest);

    if (reviewsResponse.ok) {
        console.log("Background: reviews fetched successfully");

        const reviews = await reviewsResponse.json();

        return reviews;
    }

    console.warn("Bad status when fetching reviews", reviewsResponse);
    return null;
}