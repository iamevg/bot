const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
const token = "1423055464:AAGkEeD8xwKcuWZg4hZ68Ko1MgGiK7V0MBs";
const chatId = "@cryptocurrency_prices";
const bot = new TelegramBot(token, { polling: true });
const URL = "https://binance.com/api/v3/ticker/price";
const time = 30000;

let symbols;
let messagesId = [];

let intervalSendMessage = setInterval(() => {
  fetch(URL).then(response => response.json()).then(data => {
    symbols = data.filter(item => {
      if (item.symbol == "ETHUSDT" || item.symbol == "BTCUSDT" || item.symbol == "BNBUSDT") {
        return true;
      }
    });
  }).then(() => {
    bot.sendMessage(chatId, `
<code>Bitcoin / TetherUS</code>
<b>${(+symbols[0].price).toFixed(2)}</b>

<code>Ethereum / TetherUS</code>
<b>${(+symbols[1].price).toFixed(2)}</b>

<code>Binance Coin / TetherUS</code>
<b>${(+symbols[2].price).toFixed(4)}</b>
    `, {
      parse_mode: "HTML"
    }).then(message => {
      messagesId.push(message.message_id);
    }).then(() => {
      // console.log(messagesId); // debug
    });
  });
}, time);

let intervalDeleteMessages = setInterval(() => {
  for (let i = 0; i < messagesId.length; i += 1) {
    bot.deleteMessage(chatId, messagesId[i]);
  }

  messagesId = [];
}, time * 50);