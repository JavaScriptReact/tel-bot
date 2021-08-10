const fs = require("fs");
const { PORT, TOKEN } = require("./config");
const url = "https://tel-lucas-dev-bot.herokuapp.com/";

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const bot = new TelegramBot(TOKEN, { polling: true });
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

app.use(express.json());

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Express server is listening on ${PORT}`);
});

const starting_text = fs.readFileSync("start.txt", { encoding: "utf-8" });
const author_text = fs.readFileSync("author.txt", { encoding: "utf-8" });

let x;

bot.onText(/\/start_notifications_162437/, (msg) => {
  const chatID = msg.chat.id;
  x = setInterval(() => {
    bot.sendMessage(
      chatID,
      "Please write down features, that you like and I will create them. \b @Lucas_Developer "
    );
  }, 5000);
  bot.deleteMessage(chatID, msg.message_id);
});

bot.onText(/\/start\b/, (msg, match) => {
  const chatID = msg.chat.id;
  bot.sendMessage(
    chatID,
    `Welcome here @${msg.from.username} 
  ${starting_text}`
  );
});

bot.onText(/\/time/, (msg, match) => {
  const chatID = msg.chat.id;
  const time = new Date().toLocaleTimeString();
  const date = new Date().toUTCString().match(/\d{1,2} \w{3} \d{1,4}/)[0];
  bot.sendMessage(chatID, `${date} ${time}`);
});

bot.onText(/\author/, function (msg, match) {
  const chatID = msg.chat.id;
  bot.sendMessage(chatID, author_text);
});

bot.onText(/\/bot_photo/, function (msg) {
  const chatID = msg.chat.id;
  bot.sendPhoto(chatID, "./image.jpeg");
});

bot.onText(/\/stop_notifications_162437/, (msg) => {
  const chatID = msg.chat.id;
  clearInterval(x);
  bot.deleteMessage(chatID, msg.message_id);
});
