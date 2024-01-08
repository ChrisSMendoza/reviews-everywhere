import van from "vanjs-core";

import { OverlayReview } from "./review";

const reviewWithOverlay = {
    review: {
        text: "These eggs are pretty goofy!",
    },
    position: {
        top: "543px",
        left: "100px",
    }
}

van.add(document.body, OverlayReview(reviewWithOverlay))
