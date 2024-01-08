import van from "vanjs-core";

export function OverlayReview({ review, overlay }) {

    return Overlay({
        children: Review({ review }),
        ...overlay
    })
}

export function Review(props) {
    const { p } = van.tags
    
    const review = p({
        textContent: props.review.text,
    })

    return review;
}

export function Overlay(props) {
    const { div } = van.tags;

    const overlay = div({
        class: 'overlay-review'
    }, props.children);

    overlay.style.top = props.top;
    overlay.style.left = props.left;

    return overlay;
}
