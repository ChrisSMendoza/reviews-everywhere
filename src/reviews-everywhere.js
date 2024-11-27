import van from "vanjs-core";

import { BASE_URL } from "./api-client.js";
import { CreateReviewForm, Overlay, OverlayReview } from "./review.js";

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

  // We stop the click event from bubbling up so
  // the form doesn't move when the user clicks it
  const createReviewForm = CreateReviewForm({
    // Guess the action would only benefit when JS is disabled? Do extensions run in that case (different runtime?)?
    action: createReviewUrl,

    // Learned that action uses: `Content-Type: application/x-www-form-urlencoded`
    // While the fetch POST with formData uses `: multipart/form-data`

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
        removeReviewMenu();

        const review = await createReviewResponse.json();
        const overlayReview = OverlayReview({
          review,
          position: { left: review.left, top: review.top },
        });

        van.add(document.body, overlayReview);

      } else {
        console.error("Failed to create review", createReviewResponse);
      }
    },
    onclick: stopPropagationOnClick,
    position,
  });

  const overlayReviewMenu = Overlay({
    children: createReviewForm,
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

const stopPropagationOnClick = (event) => event.stopPropagation();
