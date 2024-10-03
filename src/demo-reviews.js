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

//
browser.storage.local
  .get()
  .then((storedKeys) => {
    console.log(
      "User settings from extension local storage retrieved",
      storedKeys,
    );

    const shouldOpenReviewMenuOnClick =
      storedKeys.shouldOpenReviewMenuOnClick ?? true;

    if (shouldOpenReviewMenuOnClick) {
      document.addEventListener("click", onDocumentClick);

      console.log("Review menu will open on click - Reviews Everywhere");
    }

    // Add extension settings menu with previously saved state (or defaults)
    van.add(document.body, SettingsMenu({ shouldOpenReviewMenuOnClick }));
  })
  .catch(console.error);
