import express from "express";
// Side-effects allow form data to be parsed, no need for exported object
import _ from "body-parser";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const api = express();

api.use(express.static("static"));

// Use middleware to parse URL-encoded form data
api.use(express.urlencoded({ extended: true }));

api.get("/reviews", async (req, res) => {
  // All reviews when no parameters are passed into `findMany`
  const reviews = await prisma.review.findMany();

  res.send(reviews);
});
// TODO: Thinking it should be reviews? Maybe not? What if we post multiple? Eh.. not likely?
api.post("/review", async (req, res) => {
  // TODO: Add typing with JSDoc
  const reviewFromClient = req.body;

  console.log("Create review", reviewFromClient);

  try {
    const review = await prisma.review.create({
      data: reviewFromClient,
    });
  } catch (e) {
    console.error(e);
  }
  res.send(`Review created`);
});

export default api;
