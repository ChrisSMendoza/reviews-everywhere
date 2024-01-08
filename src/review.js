import van from "vanjs-core";

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
