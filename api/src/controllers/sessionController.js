// Gère la création et la récupération des sessions, communique avec les APIs OpenWeather
import dotenv from 'dotenv';

import Session from '../models/sessionModel.js';
import { fetchWeatherData } from '../services/weatherService.js';

dotenv.config({ path: '../.env' });

export const createSession = async (req, res) => {
    const { email, lat, lng } = req.body;
    try {
        // Appel au service météo pour enrichir les données
        const weatherData = await fetchWeatherData(lat, lng);
        const newSession = new Session({
        email,
        lat,
        lng,
        timezone: weatherData.timezone,
        temperature: weatherData.temperature,
        weather: weatherData.weather,
        weatherIcon: weatherData.icon,
        });
        await newSession.save();
        res.status(201).json(newSession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
