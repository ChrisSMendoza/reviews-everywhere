import van from "vanjs-core";

import { CreateReviewForm, Overlay } from "./review.js";

// TODO: Share base URL
const BASE_URL =
  "https://6e9d-2600-1700-5b24-a090-dcd4-affe-ad06-55fd.ngrok-free.app";

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

    onsubmit: (e) => {
      // Stop redirect caused by default submit
      e.preventDefault();

      const thisForm = e.currentTarget;
      const formInput = new FormData(thisForm);
      console.log(formInput);
      debugger;
      const createReviewRequest = new Request(`${BASE_URL}/review`, {
        method: "POST",
        body: formInput,
      });

      fetch(createReviewRequest).then(console.log).catch(console.error);

      // debugger;
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
