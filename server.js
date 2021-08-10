const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const { TOKEN, PORT, URL } = require("./config");

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

const bot = new TelegramBot(TOKEN, { polling: true });
bot.setWebHook(`${URL}/bot${TOKEN}`);

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

server.listen(PORT, () => {
  console.log("Server is active");
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  bot.sendMessage(chatId, text);
});
