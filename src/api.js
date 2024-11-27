import express from "express";
// Side-effects allow form data to be parsed, no need for exported object
import _ from "body-parser";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const api = express();

api.use(express.static("static"));

// Use middleware to parse URL-encoded form data
api.use(express.urlencoded({ extended: true }));

// TODO: Do something with reviews that have no URL
api.get("/reviews", async (req, res) => {
  // All reviews when no parameters are passed into `findMany`
  const reviews = await prisma.review.findMany({
    where: {
      // TODO: Do we ignore query parameters? Right now it's the most strict matching'
      url: req.query.windowHref,
    },
  });

  res.send(reviews);
});

// TODO: Thinking it should be reviews? Maybe not? What if we post multiple? Eh.. not likely?
api.post("/review", async (req, res) => {
  // TODO: Add typing with JSDoc
  const createReviewRequestBody = req.body;
  console.log("Create review", createReviewRequestBody);

  // Rename `windowHref` to `url` on Review
  const { windowHref, ...reviewWithoutUrl } = createReviewRequestBody;
  const incomingReview = { url: windowHref, ...reviewWithoutUrl };

  // TODO: Handle null case (missing stars)
  // Form data is submitted as string, but number of stars is a number (lol)
  const stars = Number(incomingReview.stars);

  try {
    const review = await prisma.review.create({
      data: { ...incomingReview, stars },
    });
  } catch (e) {
    console.error(e);
  }
  res.send(`Review created`);
});

/**
 * @param {string}  href - The full source URL of a review (like `window.location.href`)
 *
 * @returns {string} The parsed URL that's saved onto the `Review`. Used as reference when loading onto page. Note, query parameters are ignored.
 */
function _parseReviewUrl(href) {
  const url = new URL(href);

  // Example, joins 'https://origin.com' with '/pathname/just/path'
  const reviewUrl = `${url.origin}${url.pathname}`;

  return reviewUrl;
}

export default api;
