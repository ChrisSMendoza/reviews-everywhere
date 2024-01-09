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

export function Review(props) {
    const { p } = van.tags
    
    const review = p({
        textContent: props.review.text,
    })

    return review;
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
