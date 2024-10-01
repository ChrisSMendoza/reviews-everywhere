import van from "vanjs-core";

import { BASE_URL } from "./api-client";
import { OverlayReview, SettingsMenu } from "./review";
import { onDocumentClick } from "./reviews-everywhere";

// todo; FROM ENV
// if dev, then use localhost, like in local page
// const BASE_URL = "http://localhost:3000";
// if extension, then use hosted version
// should be set by env / build process

async function loadReviews() {
  const getReviewsRequest = new URL(`${BASE_URL}/reviews`);

  // Filter reviews that were created on this page
  getReviewsRequest.searchParams.append("windowHref", window.location.href);

  const reviewsResponse = await fetch(getReviewsRequest);

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

// TODO: Move this into another file, process, build?? IDK??
document.addEventListener("click", onDocumentClick);

// Add extension settings menu
van.add(
  document.body,
  SettingsMenu({ children: "Settings menu - Toggle context menu on click" }),
);
