import van from "vanjs-core";

/**
 *
 * @param {OverlayReviewProps} props
 * @returns
 */
export function OverlayReview({ review, position }) {

    return Overlay({
        children: Review({ review }),
        position
    })
}

/**
 *
 * @param {{ review: Review }} props
 * @returns
 */
export function Review({ review }) {
    const { p } = van.tags
    
    const reviewText = p({
        textContent: review.text,
    });

    return reviewText;
}

export function Overlay({ children, position }) {
    const { div } = van.tags;

    const overlay = div({
        class: 'overlay-review'
    }, children);

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

export const Star = () => svg({ fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", class: 'icon' },
    path({ 
        "d": "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
        "stroke-linecap":"round", 
        "stroke-linejoin": "round" 
    }),
);
