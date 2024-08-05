// client/src/ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
    const [cleanliness, setCleanliness] = useState(0);
    const [services, setServices] = useState(0);
    const [facilities, setFacilities] = useState(0);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/reviews', { cleanliness, services, facilities });
            setMessage('Review submitted successfully!');
        } catch (error) {
            setMessage('Failed to submit review');
        }
    };

    return (
        <div>
            <h1>Hotel Review</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Cleanliness:
                    <input type="number" value={cleanliness} onChange={(e) => setCleanliness(e.target.value)} min="1" max="10" />
                </label>
                <label>
                    Services:
                    <input type="number" value={services} onChange={(e) => setServices(e.target.value)} min="1" max="10" />
                </label>
                <label>
                    Facilities:
                    <input type="number" value={facilities} onChange={(e) => setFacilities(e.target.value)} min="1" max="10" />
                </label>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ReviewForm;
