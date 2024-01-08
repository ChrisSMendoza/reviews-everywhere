import van from "vanjs-core"

function Review(props) {
    const { p } = van.tags
    
    const review = p({
        textContent: props.review.text,
        class: 'overlay-review'
    })

    review.style.top = props.review.top;
    review.style.left = props.review.left;

    return review;
}

// TODO: Check the URL against saved reviews
// alert(`This page's URL: ${window.location.href}`);

const mockReview = {
    top: "543px",
    left: "442px",
    text: "These eggs are pretty goofy!"
}
const mockReviews = [
    mockReview
]

van.add(document.body, Review({ review: mockReview }))

// "https://shop.ccs.com/collections/skateboard-deck/products/ccs-over-easy-egg1-shaped-skateboard-deck-green"