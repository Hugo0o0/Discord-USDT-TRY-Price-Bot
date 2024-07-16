const chalk = require("chalk");

class Logger {
  constructor() {
    this.log = console.log;
  }

  error(...args) {
    this.log(chalk.red(...args));
  }

  warn(...args) {
    this.log(chalk.yellow(...args));
  }

  info(...args) {
    this.log(chalk.blueBright(...args));
  }

  debug(...args) {
    this.log(chalk.grey(...args));
  }

  success(...args) {
    this.log(chalk.green(...args));
  }

  log(...args) {
    this.log(...args);
  }
}

module.exports = new Logger();
