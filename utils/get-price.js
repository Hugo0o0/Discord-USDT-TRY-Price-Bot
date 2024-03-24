/**
 *
 * @returns {Promise<{mins: number, price: string,closeTime:number}>}
 * @description Fetches the current price of USDT-TRY pair from Binance API
 */
const getPrice = async () => {
  const response = await fetch(
    "https://api.binance.com/api/v3/avgPrice?symbol=USDTTRY"
  );
  return response.json();
};

module.exports = getPrice;
