const { Client, Events, GatewayIntentBits } = require("discord.js");
const getPrice = require("./utils/get-price");
const token = require("./config.json").token;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  let latestPrice = 0;
  let errorCount = 0;
  setInterval(() => {
    try {
      console.log(`Fetching new price...`);
      console.log(`Latest price was ${latestPrice} TRY.`);
      getPrice()
        .then((data) => {
          if (data.msg) {
            errorCount++;
            throw new Error(data.msg);
          }
          const parsedPrice = parseFloat(data.price).toFixed(2);
          readyClient.guilds.cache.forEach(async (guild) => {
            await guild.members.me.setNickname(`${parsedPrice} TRY`);
          });
          latestPrice = parsedPrice;
        })
        .catch((err) => {
          console.error(err);
          if (errorCount === 10) {
            console.error("Too many errors. Exiting...", err);
            process.exit(1);
          }
          readyClient.guilds.cache.forEach(async (guild) => {
            await guild.members.me.setNickname(`${latestPrice} TRY`);
          });
        });
    } catch (error) {
      console.log("Interval Function error", error.message);
      console.log(error);
    }
  }, 10_000);
});

client.login(token);
