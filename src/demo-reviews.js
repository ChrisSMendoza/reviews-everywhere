import van from "vanjs-core";

import { Review } from "./review";

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
    const reviews = await reviewsResponse.json()

    console.log("Reviews on client side: ", reviews)

    reviews.forEach(review => {
        van.add(document.body, Review({ review }));
    });
} else {
    console.warn("Bad status when fetching reviews", reviewsResponse.status);
}
