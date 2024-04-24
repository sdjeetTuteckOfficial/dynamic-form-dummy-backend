const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;

const mockFolderPath = path.resolve(__dirname, 'mock');

app.use(cors());

app.get('/api/countries', async (req, res) => {
  try {
    const countriesData = fs.readFileSync(
      path.join(mockFolderPath, 'countries.json'),
      'utf-8'
    );
    const countries = JSON.parse(countriesData);
    res.json(countries);
  } catch (error) {
    console.error('Error reading countries data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/cities', async (req, res) => {
  try {
    const citiesData = fs.readFileSync(
      path.join(mockFolderPath, 'cities.json'),
      'utf-8'
    );
    const cities = JSON.parse(citiesData);
    res.json(cities);
  } catch (error) {
    console.error('Error reading cities data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
