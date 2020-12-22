import chalk, { Chalk } from 'chalk';
import { Service } from 'typedi';

@Service()
class Logger {
  private color: Chalk = chalk;

  info(message: string) {
    console.log(this.color.greenBright(message));
  }

  infoInTesting(message: string) {
    console.log(this.color.bgGreenBright(message));
  }

  connectionSuccess(message: string) {
    console.log(this.color.blueBright(message));
  }

  connectionSuccessInTesting(message: string) {
    console.log(this.color.bgBlueBright(message));
  }

  error(message: string) {
    console.log(this.color.redBright(message));
  }

  errorInTesting(message: string) {
    console.log(this.color.bgRedBright(message));
  }
}

export default Logger;
