import van from "vanjs-core";

import { OverlayReview, Star } from "./review";

const overlayReview = {
    review: {
        text: "These eggs are pretty goofy!",
        stars: 4
    },
    position: {
        top: "543px",
        left: "100px",
    }
}

van.add(document.body, OverlayReview(overlayReview));
van.add(document.body, Star());
