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
