import van from "vanjs-core";

import { OverlayReview } from "./review";
import { onDocumentClick } from "./reviews-everywhere";

// todo; FROM ENV
// if dev, then use localhost, like in local page
// const BASE_URL = "http://localhost:3000";
// if extension, then use hosted version
// should be set by env / build process

const BASE_URL =
  "https://6e9d-2600-1700-5b24-a090-dcd4-affe-ad06-55fd.ngrok-free.app";

async function loadReviews() {
  const reviewsResponse = await fetch(`${BASE_URL}/reviews`);

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

loadReviews().then(console.log).catch(console.error);

console.log("Context menu will appear on click - Reviews Everywhere");
document.addEventListener("click", onDocumentClick);
