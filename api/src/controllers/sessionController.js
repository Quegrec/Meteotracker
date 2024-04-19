// Gère la création et la récupération des sessions, communique avec les APIs OpenWeather
import dotenv from 'dotenv';

import moment from 'moment-timezone';
import Session from '../models/sessionModel.js';
import { fetchWeatherData } from '../services/weatherService.js';

dotenv.config({ path: '../.env' });

export const createSession = async (req, res) => {
    const { email, lat, lng } = req.body;
    console.log(timezone, temperature, weather, weatherIcon)
    
    if (!timezone) {
        return res.status(400).json({ message: 'Timezone is required' });
    }
    
    try {
        // Appel au service météo pour enrichir les données
        const weatherData = await fetchWeatherData(lat, lng);

        const currentDate = moment().format('DD/MM/YYYY');
        const currentTime = moment().format('HH:mm');
        const newSession = new Session({
        email,
        lat,
        lng,
        timezone: weatherData.timezone,
        temperature: weatherData.temperature,
        weather: weatherData.weather,
        weatherIcon: weatherData.icon,
        date: currentDate,
        time: currentTime,
        });
        await newSession.save();
        res.status(201).json(newSession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
