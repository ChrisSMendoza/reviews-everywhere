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
  const position = { top: `${event.clientY}px`, left: `${event.clientX}px` };

  // We stop the click event from bubbling up so
  // the form doesn't move when the user clicks it
  const createReviewForm = CreateReviewForm({
    action: `${BASE_URL}/review`,
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
