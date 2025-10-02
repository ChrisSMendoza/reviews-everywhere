import van from "vanjs-core";

import { OverlayReview } from "./review";

const sending = browser.runtime.sendMessage({
    action: "fetchMessages",
});

sending.then(renderReviews, console.error);


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
