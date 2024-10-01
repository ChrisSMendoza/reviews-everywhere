import van from "vanjs-core";

/**
 *
 * @param {OverlayReviewProps} props
 * @returns
 */
export function OverlayReview({ review, position }) {
  return Overlay({
    children: Review({ review }),
    position,
  });
}

/**
 *
 * @param {{ review: Review }} props
 * @returns
 */
export function Review({ review }) {
  const { div, p } = van.tags;

  const reviewText = p({ textContent: review.text });
  const reviewStars = ReviewStars(review);

  return div({}, reviewText, reviewStars);
}

export function Overlay({ children, id, position }) {
  const { div } = van.tags;

  const overlay = div({ class: "overlay-review" }, children);

  // TODO: When is it missing? Get rid of this..
  if (id) {
    overlay.id = id;
  }

  overlay.style.top = position.top;
  overlay.style.left = position.left;

  return overlay;
}

/**
 * @typedef {Object} Review
 * @property {string} text - What the user had to say
 * @property {number} stars - Number of stars, out of 5
 */

/**
 * @typedef {Object} Position
 * @property {CSSStyleDeclaration.top} top - Offset from top of the screen
 * @property {CSSStyleDeclaration.left} left - Offset from left side of screen
 */

/**
 * @typedef {Object} OverlayReviewProps
 * @property {Review} review
 * @property {Position} position
 */

const { path, svg } = van.tagsNS("http://www.w3.org/2000/svg");

export const StarOutline = () =>
  svg(
    {
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor",
      class: "icon",
    },
    path({
      d: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    }),
  );

export const StarSolid = () =>
  svg(
    { viewBox: "0 0 24 24", fill: "currentColor", class: "icon" },
    path({
      d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
    }),
  );

/**
 *
 * @param {{ stars: number }} props
 */
export function ReviewStars({ stars }) {
  const MAX_NUM_STARS = 5;
  const starsRendered = [];

  for (let i = 0; i < stars; i++) {
    starsRendered.push(StarSolid());
  }

  for (let i = 0; i < MAX_NUM_STARS - stars; i++) {
    starsRendered.push(StarOutline());
  }

  const { div } = van.tags;

  return div({}, starsRendered);
}

export function CreateReviewForm({ action, onclick, onsubmit, position }) {
  const { form, input } = van.tags;

  const reviewTextInput = input({ name: "text" });

  const topInput = input({ name: "top", type: "hidden", value: position.top });
  const leftInput = input({
    name: "left",
    type: "hidden",
    value: position.left,
  });

  return form(
    {
      method: "post",
      action,
      onsubmit,
      onclick,
    },
    reviewTextInput,
    topInput,
    leftInput,
  );
}
