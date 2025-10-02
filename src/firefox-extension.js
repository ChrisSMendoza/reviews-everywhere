import { onDocumentClick } from "./reviews-everywhere.js";
import { renderReviews } from "./review";


// TODO: Fix creating reviews, needs to happen in the background script (like the fetch below)
// Show 'Create Review' form on click
document.addEventListener("click", onDocumentClick);


// Ask background script to fetch Reviews / Messages
const sending = browser.runtime.sendMessage({
    action: "fetchMessages",
});

sending.then(handleFetchReviewsMessage, console.error);

function handleFetchReviewsMessage(fetchReviewsResult) {

    if(fetchReviewsResult.success) {
        renderReviews(fetchReviewsResult);
    }

    console.error("Background failed to respond to fetchMessages action", fetchReviewsResult.error);
}
