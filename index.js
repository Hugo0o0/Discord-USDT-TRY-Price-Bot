const { Client, Events, GatewayIntentBits } = require("discord.js");
const getPrice = require("./utils/get-price");
const logger = require("./utils/Logger");
const token = require("./config.json").token;
const startCLICountdown = require("./utils/start-cli-countdown");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const logFetchingNewPriceInfo = (latestPrice) => {
  if (latestPrice) {
    logger.info(`\nLast price: ${latestPrice} TRY`);
  }
};

const logStartInfo = (client) => {
  logger.info(`Ready! Logged in as ${client.user.tag}`);
  logger.info("Fetching price will start in 30 seconds...");
};

const setNickname = async (client, nickname) => {
  client.guilds.cache.forEach(async (guild) => {
    await guild.members.me.setNickname(nickname);
  });
};

const setNewNicknameEveryThirtySeconds = (latestPrice, client) => {
  setInterval(async () => {
    startCLICountdown(30);
    logFetchingNewPriceInfo(latestPrice);
    const data = await getPrice();
    latestPrice = parseFloat(data.price).toFixed(2);
    await setNickname(client, `${latestPrice} TRY`);
  }, 30_000);
};

client.once(Events.ClientReady, (readyClient) => {
  logStartInfo(readyClient);
  startCLICountdown(30);
  let latestPrice = 0;
  try {
    setNewNicknameEveryThirtySeconds(latestPrice, readyClient);
  } catch (error) {
    logger.error(error);
  }
});

client.login(token);
