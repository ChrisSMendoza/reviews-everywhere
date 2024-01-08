import van from "vanjs-core";

import { Review } from "./review";

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