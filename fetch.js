import fetch from 'node-fetch';
import dotenv from "dotenv"
dotenv.config()
const fetchapi = async (location) => {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${process.env.KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const temperature = data.timelines.minutely[0].values.temperature;
        const humidity = data.timelines.minutely[0].values.humidity;
        const wind = data.timelines.minutely[0].values.windSpeed;
        return { temperature, humidity, wind };
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export default fetchapi