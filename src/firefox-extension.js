import van from "vanjs-core";

import { OverlayReview } from "./review";

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

function renderReviews({ reviews }) {
    const overlayReviews = reviews
        .filter(r => r.type === 'overlay')
        .map((review) =>
            OverlayReview({
                review,
                position: { left: review.left, top: review.top },
            }),
    );
    // Show them to the user
    overlayReviews.forEach((overlayReview) =>
      van.add(document.body, overlayReview),
    );
}
