import { Client, GatewayIntentBits } from 'discord.js';
import fetchapi from '../fetch.js'; // Adjust path as necessary
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("/weather")) {
        try {
            const userMessage = message.content.slice(9).trim();
            const { temperature, humidity, wind } = await fetchapi(userMessage);

            message.reply({
                content: `${userMessage.toUpperCase()}\nCurrent temperature: ${temperature}°C\nHumidity: ${humidity}%\nWindspeed: ${wind} m/s`
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
            message.reply({
                content: 'Sorry, I could not fetch the weather data.'
            });
        }
    }
});

client.login(process.env.PRIVATE);

export default (req, res) => {
    res.status(200).send('Bot is running');
};
