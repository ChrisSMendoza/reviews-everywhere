import van from "vanjs-core"

function Review(props) {
    const { p } = van.tags
    
    const review = p({
        textContent: props.review.text,
    })
    
    review.style.top = props.review.top;
    review.style.left = props.review.left;
    review.style.position = "absolute";

    // Should only be done if it has a position
    // reviewOverlay.style.top = review.top;
    // reviewOverlay.style.left = review.left;
    // reviewOverlay.style.position = "absolute";
    // TODO: Think about a sensible value
    // reviewOverlay.style.zIndex = "99";

    // reviewOverlay.style.backgroundColor = "white";
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

function renderReview(review) {
    const reviewOverlay = document.createElement('p');
    reviewOverlay.textContent = review.text;

    // Should only be done if it has a position
    reviewOverlay.style.top = review.top;
    reviewOverlay.style.left = review.left;
    reviewOverlay.style.position = "absolute";
    // TODO: Think about a sensible value
    reviewOverlay.style.zIndex = "99";

    reviewOverlay.style.backgroundColor = "white";

    document.body.appendChild(reviewOverlay);
}

// renderReview(mockReview);
// "https://shop.ccs.com/collections/skateboard-deck/products/ccs-over-easy-egg1-shaped-skateboard-deck-green"