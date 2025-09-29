const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Allow the server to read JSON from requests

/**
 * API Route: /api/predict
 * This is the only endpoint our backend needs. It acts as a proxy.
 */
app.post('/api/predict', async (req, res) => {
  try {
    const frontendData = req.body;
    console.log('Received data from frontend:', frontendData);

    // The URL for our Python ML server
    const mlApiUrl = 'http://127.0.0.1:5000/predict';

    // Forward the data to the Python API
    console.log(`Forwarding data to ML API at ${mlApiUrl}...`);
    const mlResponse = await axios.post(mlApiUrl, frontendData);

    // Send the prediction from the Python API back to the frontend
    console.log('Received prediction from ML API:', mlResponse.data);
    res.json(mlResponse.data);

  } catch (error) {
    console.error('Error proxying request to ML API:', error.message);
    
    // Send a detailed error message back to the frontend
    if (error.code === 'ECONNREFUSED') {
        res.status(503).json({
            message: 'The prediction service is unavailable. Is the Python ML server running?'
        });
    } else {
        res.status(500).json({ message: 'An error occurred on the backend server.' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Node.js backend server started on http://localhost:${PORT}`);
});

