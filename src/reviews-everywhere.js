import van from "vanjs-core";

import { OverlayReview } from "./review";

const reviewWithOverlay = {
    review: {
        text: "These eggs are pretty goofy!",
    },
    overlay: {
        top: "543px",
        left: "442px",
    }
}

van.add(document.body, OverlayReview(reviewWithOverlay))
