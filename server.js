const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = require("./config").TOKEN;
const PORT = require("./config").PORT;

const app = express();
const server = createServer(app);

app.use(cors());

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const id = msg.chat.id;
  bot.sendMessage(id, msg.text);
});

server.listen(PORT, () => {
  console.log("Server is active");
});
