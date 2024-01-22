import van from "vanjs-core";

import { Review, CreateReviewForm } from "./review";

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
    const { ul, li } = van.tags;
    const reviews = await reviewsResponse.json()

    const reviewListItems = reviews
        .map((review) => Review({ review }))
        .map(reviewEl => li(reviewEl));

    van.add(document.body, ul(reviewListItems))
} else {
    console.warn("Bad status when fetching reviews", reviewsResponse.status);
}

van.add(document.body, CreateReviewForm());
