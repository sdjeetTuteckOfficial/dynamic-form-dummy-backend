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
    const formattedCities = cities.map((city) => ({
      id: city.id,
      value: city.value,
    }));
    res.json(formattedCities);
  } catch (error) {
    console.error('Error reading cities data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/states/filter', async (req, res) => {
  try {
    const countryId = req.query.countryId;
    console.log('country', countryId, typeof countryId);
    if (!countryId) {
      return res
        .status(400)
        .json({ error: 'Country ID parameter is required' });
    }
    const statesData = fs.readFileSync(
      path.join(mockFolderPath, 'states.json'),
      'utf-8'
    );
    const states = JSON.parse(statesData);
    const filteredStates = states.filter(
      (state) => state.countryId === countryId
    );
    const formattedStates = filteredStates.map((state) => ({
      id: state.id,
      value: state.value,
    }));
    res.json(formattedStates);
  } catch (error) {
    console.error('Error reading states data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/cities/filter', async (req, res) => {
  try {
    const stateId = req.query.stateId;
    if (!stateId) {
      return res.status(400).json({ error: 'State ID parameter is required' });
    }
    const citiesData = fs.readFileSync(
      path.join(mockFolderPath, 'cities.json'),
      'utf-8'
    );
    const cities = JSON.parse(citiesData);
    const filteredCities = cities.filter((city) => city.stateId === stateId);
    const formattedCities = filteredCities.map((city) => ({
      id: city.id,
      value: city.value,
    }));
    res.json(formattedCities);
  } catch (error) {
    console.error('Error reading cities data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/postalCodes/filter', async (req, res) => {
  try {
    const stateId = req.query.stateId;
    if (!stateId) {
      return res.status(400).json({ error: 'State ID parameter is required' });
    }
    const postalCodes = fs.readFileSync(
      path.join(mockFolderPath, 'postalCodes.json'),
      'utf-8'
    );
    const parsedCodes = JSON.parse(postalCodes);
    const filteredPostalCodes = parsedCodes.filter(
      (postalCode) => postalCode.stateId === stateId
    );
    const formattedPostalCodes = filteredPostalCodes.map((postalCode) => ({
      id: postalCode.id,
      value: postalCode.value,
    }));
    res.json(formattedPostalCodes);
  } catch (error) {
    console.error('Error reading postal code data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
