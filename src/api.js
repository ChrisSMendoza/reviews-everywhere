import express from 'express';
// Side-effects allows form data to be parsed, no need for exported object
import _ from 'body-parser';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express()
const port = 3000

app.use(express.static('static'));

// Use middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit-form', async (req, res) => {
    // TODO: Add typing with JSDoc
    const reviewFromClient = req.body;

    console.log("reviewFromClient:", reviewFromClient)

    const review = await prisma.review.create({
        data: reviewFromClient
    })

    res.send(`Review created`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
