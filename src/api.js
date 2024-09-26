import express from "express";
// Side-effects allow form data to be parsed, no need for exported object
import _ from "body-parser";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const api = express();

// TODO: Get this file to reload the project on change
api.use(express.static("static"));

// Use middleware to parse URL-encoded form data
api.use(express.urlencoded({ extended: true }));

api.get("/reviews", async (req, res) => {
  const url = parseReviewUrl(req.query.windowHref);
  // All reviews when no parameters are passed into `findMany`
  const reviews = await prisma.review.findMany({
    where: {
      url,
    },
  });

  res.send(reviews);
});

// TODO: Thinking it should be reviews? Maybe not? What if we post multiple? Eh.. not likely?
api.post("/review", async (req, res) => {
  // TODO: Add typing with JSDoc
  const createReviewRequestBody = req.body;
  console.log("Create review", createReviewRequestBody);

  // Parse href (full URL) from client so we only use `origin` and `pathname`.
  // We ignore query parameters right now, but still have them available.
  const { windowHref, ...reviewWithoutUrl } = createReviewRequestBody;
  const url = parseReviewUrl(windowHref);

  try {
    const review = await prisma.review.create({
      data: { ...reviewWithoutUrl, url },
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
function parseReviewUrl(href) {
  const url = new URL(href);

  // Example, joins 'https://origin.com' with '/pathname/just/path'
  const reviewUrl = `${url.origin}${url.pathname}`;

  return reviewUrl;
}

export default api;
