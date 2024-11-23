import van from "vanjs-core";

import { BASE_URL } from "./api-client";
import { OverlayReview, SettingsMenu } from "./review";
import { onDocumentClick } from "./reviews-everywhere";

// todo; FROM ENV
// if dev, then use localhost, like in local page
// const BASE_URL = "http://localhost:3000";
// if extension, then use hosted version
// should be set by env / build process

/**
 * @param {string} baseURL - The base URL of the API
 */
async function loadReviews(baseURL) {
  const getReviewsUrl = `${baseURL}/reviews`;
  const getReviewsRequest = new URL(getReviewsUrl);

  getReviewsRequest.searchParams.append("windowHref", window.location.href);

  console.log("Fetching reviews", { getReviewsRequest });

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

loadReviews(BASE_URL).then(console.log).catch(console.error);


// Load the setting from storage
const openReviewMenuOnClickFromStorage = localStorage.getItem("shouldOpenReviewMenuOnClick") ?? "true";

const shouldOpenReviewMenuOnClick = openReviewMenuOnClickFromStorage === "true";

console.log("shouldOpenReviewMenuOnClick", shouldOpenReviewMenuOnClick);

if (shouldOpenReviewMenuOnClick) {
  document.addEventListener("click", onDocumentClick);
}

function setSettings({ shouldOpenReviewMenuOnClick }) {
  localStorage.setItem("shouldOpenReviewMenuOnClick", shouldOpenReviewMenuOnClick);

  console.log("Settings saved in local storage", { shouldOpenReviewMenuOnClick });
}

// Add extension settings menu with previously saved state (or defaults)
van.add(document.body, SettingsMenu({ shouldOpenReviewMenuOnClick, setSettings }));
