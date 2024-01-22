import van from "vanjs-core";

import { OverlayReview } from "./review";

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

van.add(document.body, OverlayReview(overlayReview));
