import van from "vanjs-core";

import { BASE_URL } from "./api-client";
import { CreateReviewForm, OverlayReview, SettingsMenu, hideReviews } from "./review";
import { onDocumentClick, stopPropagationOnClick } from "./reviews-everywhere";

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
    // TODO: Add `.filter(r => r.type === 'overlay')` to only show overlay reviews?
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
const shouldShowReviewsFromStorage = localStorage.getItem("shouldShowReviews") ?? "true";

const shouldOpenReviewMenuOnClick = openReviewMenuOnClickFromStorage === "true";
const shouldShowReviews = shouldShowReviewsFromStorage === "true";

console.log("shouldOpenReviewMenuOnClick", shouldOpenReviewMenuOnClick);
console.log("shouldShowReviews", shouldShowReviews);

if (shouldOpenReviewMenuOnClick) {
  document.addEventListener("click", onDocumentClick);
}

if (!shouldShowReviews) {
  hideReviews();
}

// TODO: Setters for each setting?
function setSettings({ shouldOpenReviewMenuOnClick, shouldShowReviews }) {
  // Explicitly check for undefined because false is a valid value

  if(shouldOpenReviewMenuOnClick !== undefined) {
    localStorage.setItem("shouldOpenReviewMenuOnClick", shouldOpenReviewMenuOnClick);
  }

  if(shouldShowReviews !== undefined) {
    localStorage.setItem("shouldShowReviews", shouldShowReviews);
  }

  console.log("Settings saved in local storage", { shouldOpenReviewMenuOnClick, shouldShowReviews });
}

// Add extension settings menu with previously saved state (or defaults)
van.add(document.body, SettingsMenu({ shouldOpenReviewMenuOnClick, shouldShowReviews, setSettings }));

// TODO: Abstract the parts that are duplicated here and the document onclick handler
// Timeline review form
const createReviewUrl = `${BASE_URL}/review`;

const timelineReviewForm = CreateReviewForm({
  // Guess the action would only benefit when JS is disabled? Do extensions run in that case (different runtime?)?
  action: createReviewUrl,

  reviewType: "timeline",

  onsubmit: async (e) => {
    // Stop redirect caused by default submit
    e.preventDefault();

    const thisForm = e.currentTarget;
    const formInput = new FormData(thisForm);
    const createReviewSearchParams = new URLSearchParams(formInput);

    // Add current webpage URL to payload, parsed on backend for origin + pathname (ignore query params)
    createReviewSearchParams.set("windowHref", window.location.href);

    const createReviewRequest = new Request(createReviewUrl, {
      method: "POST",
      body: createReviewSearchParams,
      headers: {
        // TODO: Test if this is added automatically?
        // Our server doesn't know how to parse `multipart/form-data`, so use simpler format
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const createReviewResponse = await fetch(createReviewRequest);

    if (createReviewResponse.ok) {
      // Hide the Review Menu to show the new review
      // removeReviewMenu();

      // TODO: Add to sidebar when timeline review is created
      // const review = await createReviewResponse.json();
      // const overlayReview = OverlayReview({
      //   review,
      //   position: { left: review.left, top: review.top },
      // });

      // van.add(document.body, overlayReview);

    } else {
      console.error("Failed to create review", createReviewResponse);
    }
  },
  onclick: stopPropagationOnClick,
  // Timeline reviews don't need a position, they're always in the sidebar
  position: { left: "", top: "" },
});

van.add(document.body, timelineReviewForm);
