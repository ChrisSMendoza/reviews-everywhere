import van from "vanjs-core";

import { OverlayReview, StarOutline, StarSolid } from "./review";

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
van.add(document.body, StarOutline());
van.add(document.body, StarSolid());
