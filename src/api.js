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
  // TODO: Share this with POST handler below, will make it easier to set default URL
  const windowUrl = new URL(req.query.windowHref);
  const url = `${windowUrl.origin}${windowUrl.pathname}`;
  // All reviews when no parameters are passed into `findMany`
  const reviews = await prisma.review.findMany({
    where: {
      url,
    },
  });

  res.send(reviews);
});

// We need to have the review tied to a domain when it's created.
// Then when we fetch reviews, it'll be by domain? Or should they be IDs?
// For now, we'll go with domains!
//
// And handle when there's no domain? Could migrate to like a dev URL?

// TODO: Thinking it should be reviews? Maybe not? What if we post multiple? Eh.. not likely?
api.post("/review", async (req, res) => {
  // TODO: Add typing with JSDoc
  const createReviewRequestBody = req.body;
  console.log("Create review", createReviewRequestBody);

  // Parse href (full URL) from client so we only use `origin` and `pathname`.
  // We ignore query parameters right now, but still have them available.
  const { windowHref, ...reviewWithoutUrl } = createReviewRequestBody;
  const windowUrl = new URL(windowHref);
  const url = `${windowUrl.origin}${windowUrl.pathname}`;

  try {
    const review = await prisma.review.create({
      data: { ...reviewWithoutUrl, url },
    });
  } catch (e) {
    console.error(e);
  }
  res.send(`Review created`);
});

export default api;
