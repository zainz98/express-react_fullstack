import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/', (req, res) => res.send('Server running'));

const people = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Michael Brown' },
  { id: 4, name: 'Emily Johnson' },
  { id: 5, name: 'David Jones' },
  { id: 6, name: 'Sarah Davis' },
  { id: 7, name: 'Kevin Wilson' },
  { id: 8, name: 'Laura Taylor' },
  { id: 9, name: 'Richard Williams' },
  { id: 10, name: 'Emma White' },
];

app.get("/api/weather/:city", async (req, res) => {
  try {
    // Get the city name from the request parameter
    console.log(req.params);
    const city = req.params.city;

    // Call the weather API with the city name
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=9ee0f7b5de614141b7485133231903%20&q=${city}&aqi=no`
    );
      console.log('response', response);
    // Extract the relevant weather data from the response
    const data = response.data;

    // Send the weather data back to the client
    //res.send(data);
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("An error occurred while fetching weather data.");
  }
});

app.get('/api/people', (req, res) => {
  res.json(people);
});
app.get('/api/weather', (req, res) => {

  res.json(people);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));