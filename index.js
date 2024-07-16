const { Client, Events, GatewayIntentBits } = require("discord.js");
const getPrice = require("./utils/get-price");
const logger = require("./utils/Logger");
const token = require("./config.json").token;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const logFetchingNewPriceInfo = (latestPrice) => {
  logger.info(`Fetching new price...`);
  if (latestPrice) {
    logger.info(`Latest price: ${latestPrice} TRY`);
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

const setNewNicknameEveryTenSeconds = (latestPrice, client) => {
  setInterval(async () => {
    logFetchingNewPriceInfo(latestPrice);
    const data = await getPrice();
    latestPrice = parseFloat(data.price).toFixed(2);
    await setNickname(client, `${latestPrice} TRY`);
  }, 30_000);
};

client.once(Events.ClientReady, (readyClient) => {
  logStartInfo(readyClient);
  let latestPrice = 0;
  try {
    setNewNicknameEveryTenSeconds(latestPrice, readyClient);
  } catch (error) {
    logger.error(error);
  }
});

client.login(token);
