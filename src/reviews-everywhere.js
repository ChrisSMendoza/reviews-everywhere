import van from "vanjs-core";

import { BASE_URL } from "./api-client.js";
import { CreateReviewForm, Overlay } from "./review.js";

/**
 * @param {MouseEvent} event
 * @todo - Should we use PointerEvent? Seems like Firefox / Safari still use MouseEvents?
 */
export function onDocumentClick(event) {
  const addReviewMenuInDOM = document.querySelector("#add-review-overlay");

  if (addReviewMenuInDOM) {
    addReviewMenuInDOM.remove();
  }
  // TODO: Add units prop so there's no string concatenation needed?
  const position = { top: `${event.clientY}px`, left: `${event.clientX}px` };

  // We stop the click event from bubbling up so
  // the form doesn't move when the user clicks it
  const createReviewForm = CreateReviewForm({
    // Guess the action would only benefit when JS is disabled? Do extensions run in that case (different runtime?)?
    action: `${BASE_URL}/review`,

    // Learned that action uses: `Content-Type: application/x-www-form-urlencoded`
    // While the fetch POST with formData uses `: multipart/form-data`

    onsubmit: (e) => {
      // Stop redirect caused by default submit
      e.preventDefault();

      const thisForm = e.currentTarget;
      const formInput = new FormData(thisForm);
      const createReviewSearchParams = new URLSearchParams(formInput);

      // Add current webpage URL to payload, parsed on backend for origin + pathname (ignore query params)
      createReviewSearchParams.set("windowHref", window.location.href);

      const createReviewUrl = `${BASE_URL}/review`;
      const createReviewRequest = new Request(createReviewUrl, {
        method: "POST",
        body: createReviewSearchParams,
        headers: {
          // TODO: Test if this is added automatically?
          // Our server doesn't know how to parse `multipart/form-data`, so use simpler format
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      fetch(createReviewRequest).then(console.log).catch(console.error);
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

const stopPropagationOnClick = (event) => event.stopPropagation();
