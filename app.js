const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

app.get('/weather', (req, res) => {
  const location = req.query.location;

  if (!location) {
    return res.status(400).json({ error: 'Location not provided' });
  }

  const apiKey = '00d8c925094723c6ce602d1415dd5832'; // Replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl)
    .then(response => {
      const weatherData = {
        location: location,
        temperature: response.data.main.temp,
        conditions: response.data.weather[0].description,
      };
      res.json(weatherData);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error fetching weather data' });
    });
});

app.listen(port, () => {
  console.log(`Simple Weather API is running on port ${port}`);
});
