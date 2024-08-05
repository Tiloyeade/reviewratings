const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/reviewratings', { useNewUrlParser: true, useUnifiedTopology: true });

const reviewSchema = new mongoose.Schema({
    cleanliness: Number,
    services: Number,
    facilities: Number,
});

const Review = mongoose.model('Review', reviewSchema);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Review API');
});

app.post('/api/reviews', async (req, res) => {
    const { cleanliness, services, facilities } = req.body;
    const review = new Review({ cleanliness, services, facilities });
    try {
        await review.save();
        res.status(201).send(review);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
