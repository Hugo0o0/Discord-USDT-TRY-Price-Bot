const readline = require("readline");
const chalk = require("chalk");
function startCLICountdown(seconds) {
  let remainingSeconds = seconds;
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const updateCountdown = () => {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(
      chalk.blueBright(
        `Fetching new price in ${chalk.bold(remainingSeconds)} seconds...`
      )
    );
  };

  const countdownInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateCountdown();
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
  updateCountdown();
}

module.exports = startCLICountdown;
