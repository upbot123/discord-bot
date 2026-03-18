console.log("BOT STARTING...");

const express = require("express");
const app = express();

const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// web cho Render
app.get("/", (req, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("WEB OK");
});

// bot
client.on("ready", async () => {
  console.log("LOGGED IN:", client.user.tag);

  try {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    console.log("FOUND CHANNEL");

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

  } catch (err) {
    console.log("CHANNEL ERROR:", err.message);
  }
});

// login
client.login(process.env.TOKEN).catch(err => {
  console.log("TOKEN ERROR:", err.message);
});
