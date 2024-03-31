const { Client, Events, GatewayIntentBits } = require("discord.js");
const getPrice = require("./utils/get-price");
const token = require("./config.json").token;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  readyClient.user.setPresence({ activities: null });
  let latestPrice = 0;
  let errorCount = 0;
  setInterval(() => {
    console.log(`Fetching new price...`);
    console.log(`Latest price was ${latestPrice} TRY.`);
    getPrice()
      .then((data) => {
        if (data.msg) {
          errorCount++;
          throw new Error(data.msg);
        }
        const parsedPrice = parseFloat(data.price).toFixed(2);
        readyClient.user.setUsername(`₺${parsedPrice}`);
        latestPrice = parsedPrice;
      })
      .catch((err) => {
        console.error(err);
        if (errorCount === 10) {
          console.error("Too many errors. Exiting...", err);
          process.exit(1);
        }
        readyClient.user.setUsername(`USDT/TRY: ${latestPrice} TRY`, {
          type: 3,
        });
      });
  }, 15_000);
});

client.login(token);