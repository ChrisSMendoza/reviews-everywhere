import van from "vanjs-core";

import { OverlayReview } from "./review";
import { onDocumentClick } from "./reviews-everywhere";

// todo; FROM ENV
const BASE_URL = "http://localhost:3000";

async function loadReviews() {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => console.log(json));

  // const reviewsResponse = await fetch(`${BASE_URL}/reviews`);

  // if (reviewsResponse.ok) {
  //   const reviews = await reviewsResponse.json();

  //   const overlayReviews = reviews.map((review) =>
  //     // This renders fine, but it's technically not a review.
  //     // There's no stars. TODO: Generalize to Message? OverlayMessage?
  //     OverlayReview({
  //       review,
  //       position: { left: review.left, top: review.top },
  //     }),
  //   );
  //   // Show them to the user
  //   overlayReviews.forEach((overlayReview) =>
  //     van.add(document.body, overlayReview),
  //   );
  // } else {
  //   console.warn("Bad status when fetching reviews", reviewsResponse.status);
  // }
}

loadReviews().then(console.log).catch(console.error);

console.log("Context menu will appear on click - Reviews Everywhere");
document.addEventListener("click", onDocumentClick);
