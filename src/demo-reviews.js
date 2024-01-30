import van from "vanjs-core";

import { Review, CreateReviewForm, Overlay } from "./review";

const overlayReview = {
    review: {
        text: "Dude, vite-express just works out of the box :clap:",
        stars: 3
    },
    position: {
        top: "543px",
        left: "100px",
    }
}

const reviewsResponse = await fetch('/reviews');

if(reviewsResponse.ok) {
    const reviews = await reviewsResponse.json();
    // Note, `OverlayReview` isn't used because we don't persist stars yet
    // Still thinking about the API, should probably generalize to a "message"...
    const overlayReviews = reviews.map(review =>
        Overlay({ 
            children: van.tags.p(review.text), 
            position: { left: review.left, top: review.top }
        })
    )
    // Show them to the user
    overlayReviews.forEach(overlayReview => van.add(document.body, overlayReview));
} else {
    console.warn("Bad status when fetching reviews", reviewsResponse.status);
}
// TODO: Allow undefined props?
// van.add(document.body, CreateReviewForm());

document.addEventListener('click', (event) => {
    const addReviewMenuInDOM = document.querySelector("#add-review-overlay");

    if(addReviewMenuInDOM) {
        addReviewMenuInDOM.remove();
    }

    const position = { top: `${event.clientY}px`, left: `${event.clientX}px` }
    const overlayReviewMenu = Overlay({ children: CreateReviewForm({ onsubmit, position }), id: "add-review-overlay", position })

    van.add(document.body, overlayReviewMenu);
});
