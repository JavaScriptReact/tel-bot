const TelegramBot = require("node-telegram-bot-api");
const TOKEN = require("./config").TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const id = msg.chat.id;
  bot.sendMessage(id, msg.text);
});
