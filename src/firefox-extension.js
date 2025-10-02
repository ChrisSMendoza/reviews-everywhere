import { renderReviews } from "./review";


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
