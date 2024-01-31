import van from "vanjs-core";

import { CreateReviewForm, Overlay, OverlayReview } from "./review";


const reviewsResponse = await fetch('/reviews');

if(reviewsResponse.ok) {
    const reviews = await reviewsResponse.json();

    const overlayReviews = reviews.map(review =>
        // This renders fine, but it's technically not a review.
        // There's no stars. TODO: Generalize to Message? OverlayMessage?
        OverlayReview({
            review,
            position: { left: review.left, top: review.top }
        })
    )
    // Show them to the user
    overlayReviews.forEach(overlayReview => van.add(document.body, overlayReview));
} else {
    console.warn("Bad status when fetching reviews", reviewsResponse.status);
}

document.addEventListener('click', (event) => {
    const addReviewMenuInDOM = document.querySelector("#add-review-overlay");

    if(addReviewMenuInDOM) {
        addReviewMenuInDOM.remove();
    }

    const position = { top: `${event.clientY}px`, left: `${event.clientX}px` }

    const overlayReviewMenu = Overlay({ 
        children: CreateReviewForm({ 
            onclick: stopPropagationOnClick,
            position 
        }), 
        id: "add-review-overlay", 
        position 
    });

    van.add(document.body, overlayReviewMenu);
});

const stopPropagationOnClick = (event) => event.stopPropagation();
