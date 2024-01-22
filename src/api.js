import express from 'express';
// Side-effects allows form data to be parsed, no need for exported object
import _ from 'body-parser';

const app = express()
const port = 3000

app.use(express.static('static'));

// Use middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit-form', (req, res) => {
    const formData = req.body;

    console.log(formData);

    res.send('Form submitted successfully');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
