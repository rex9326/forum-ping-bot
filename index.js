const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

const TOKEN = process.env.BOT_TOKEN; 
const ROLE_ID = process.env.ROLE_ID; 

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("threadCreate", async (thread) => {
  try {
    if (thread.parent?.type === 15) {
      await thread.send(`<@&${ROLE_ID}> A new forum post was created: **${thread.name}**`);
      console.log(`Pinged role in thread ${thread.id}`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
});

client.login(TOKEN);
