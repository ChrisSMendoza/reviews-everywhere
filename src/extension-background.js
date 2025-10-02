// TODO: Fix Uncaught SyntaxError: import declarations may only appear at top level of a module

console.log("`extension-background.js` has ran!");

// TODO: Think of new name for general "message" posted on a webpage to distuingish from extension messages (and others since so generic). postIt? placement?
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

        fetchReviews({ windowHref: sender.url })
            .then(reviews => {
                console.log("Background: Reviews fetched successfully");
                sendResponse({ success: true, reviews })
            })

            .catch(error => {
                // Logging `error` only won't show response, `error.response` must be logged separately
                console.error(error, error?.response);
                // Runs the success handler in content script (`firefox-extension.js`), but I'd rather have the error callback used..
                sendResponse({ success: false, error });
            });

        // NOTE: Using `return` with response Promise doesn't seem to send it to client listener (maybe because it can't be serialized, but no error shown)
    }

    // This is needed to run an asynchronous task with `sendResponse` on both Firefox and Chrome
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_an_asynchronous_response_using_sendresponse
    return true;
});

async function fetchReviews(options) {
    const BASE_URL = "https://b73efe21c6c4.ngrok-free.app";
    const getReviewsRequest = new URL(`${BASE_URL}/reviews`);

    getReviewsRequest.searchParams.append("windowHref", options.windowHref);

    const reviewsResponse = await fetch(getReviewsRequest);

    if (reviewsResponse.ok) {
        const reviews = await reviewsResponse.json();

        return reviews;
    }

    const fetchReviewsError = Error("Failed to fetch reviews");
    fetchReviewsError.response = reviewsResponse;

    throw fetchReviewsError;
}
