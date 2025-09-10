import van from "vanjs-core";

import { BASE_URL } from "./api-client.js";
import { CreateReviewForm, Overlay, OverlayReview, ReviewPreview, resetPreviewReview } from "./review.js";

/**
 * @param {MouseEvent} event
 * @todo - Should we use PointerEvent? Seems like Firefox / Safari still use MouseEvents?
 */
export function onDocumentClick(event) {

  // Does nothing when missing from DOM
  removeReviewMenu();

  // TODO: Add units prop so there's no string concatenation needed?
  const position = { top: `${event.clientY}px`, left: `${event.clientX}px` };

  const createReviewUrl = `${BASE_URL}/review`;

  const createReviewForm = CreateReviewForm({
    // Guess the action would only benefit when JS is disabled? Do extensions run in that case (different runtime?)?
    action: createReviewUrl,

    // Document click handler is creating the form, so it's an overlay Review (placed where clicked)
    reviewType: "overlay",

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
        const review = await createReviewResponse.json();

        const overlayReview = OverlayReview({
          review,
          position: { left: review.left, top: review.top },
        });

        van.add(document.body, overlayReview);

        // Hide the Review Menu to show the new review
        removeReviewMenu();

        // Reset Preview Review state to initial values for the next entry
        resetPreviewReview();
      } else {
        console.error("Failed to create review", createReviewResponse);
      }
    },
    // We stop the click event from bubbling up so the form doesn't move when the user clicks it
    onclick: stopPropagationOnClick,

    position,
  });
  // TODO: Share static `id` with `removeReviewMenu`? Only place it's used, maybe if used again...
  const overlayReviewMenu = Overlay({
    // TODO: Fix preview being hidden when "Hide reviews" is selected? Not huge issue..
    // TODO: Connect these, state is hidden here..
    children: van.tags.div(ReviewPreview(), createReviewForm),
    id: "add-review-overlay",
    position,
  });

  van.add(document.body, overlayReviewMenu);
}

export function removeReviewMenu() {
  const reviewMenuInDOM = document.querySelector("#add-review-overlay");

  if (reviewMenuInDOM) {
    reviewMenuInDOM.remove();
  }
}

export const stopPropagationOnClick = (event) => event.stopPropagation();
