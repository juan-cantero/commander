import chalk, { Chalk } from 'chalk';
import { Service } from 'typedi';

@Service()
class Logger {
  private color: Chalk = chalk;

  info(message: string) {
    console.log(this.color.greenBright(message));
  }

  connectionSuccess(message: string) {
    console.log(this.color.blueBright(message));
  }

  error(message: string) {
    console.log(this.color.redBright(message));
  }
}

export default Logger;
