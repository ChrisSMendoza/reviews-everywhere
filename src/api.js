import express from "express";
// Side-effects allows form data to be parsed, no need for exported object
import _ from "body-parser";
import ViteExpress from "vite-express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const api = express();
const PORT = 3000;

api.use(express.static("static"));

// Use middleware to parse URL-encoded form data
api.use(express.urlencoded({ extended: true }));

api.get("/reviews", async (req, res) => {
  // All reviews when no parameters are passed into `findMany`
  const reviews = await prisma.review.findMany();

  res.send(reviews);
});

api.post("/review", async (req, res) => {
  // TODO: Add typing with JSDoc
  const reviewFromClient = req.body;

  console.log("reviewFromClient:", reviewFromClient);

  const review = await prisma.review.create({
    data: reviewFromClient,
  });

  res.send(`Review created`);
});

ViteExpress.listen(api, PORT, () =>
  console.log(`Server is listening on ${PORT}`),
);
