import van from "vanjs-core";

import { OverlayReview } from "./review";
import { onDocumentClick } from "./reviews-everywhere";

async function getAndShowReviews() {
  const reviewsResponse = await fetch("/reviews");

  if (reviewsResponse.ok) {
    const reviews = await reviewsResponse.json();

    const overlayReviews = reviews.map((review) =>
      // This renders fine, but it's technically not a review.
      // There's no stars. TODO: Generalize to Message? OverlayMessage?
      OverlayReview({
        review,
        position: { left: review.left, top: review.top },
      }),
    );
    // Show them to the user
    overlayReviews.forEach((overlayReview) =>
      van.add(document.body, overlayReview),
    );
  } else {
    console.warn("Bad status when fetching reviews", reviewsResponse.status);
  }
}

getAndShowReviews().then(console.log).catch(console.error);

document.addEventListener("click", onDocumentClick);
