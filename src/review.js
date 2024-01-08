import van from "vanjs-core";

export function Review(props) {
    const { p } = van.tags
    
    const review = p({
        textContent: props.review.text,
        class: 'overlay-review'
    })

    review.style.top = props.review.top;
    review.style.left = props.review.left;

    return review;
}
