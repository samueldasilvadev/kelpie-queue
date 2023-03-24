import Colors from '../types/ColorsEnum';
import ILogger from '../types/ILogger';
import DateTime from './date-time';

class Logger implements ILogger {
  private dateTime: DateTime;

  constructor(dateTime: DateTime) {
    this.dateTime = dateTime;
  }

  log(color: Colors, log: string | unknown) {
    let out = log;
    if (typeof log === 'object') {
      out = JSON.stringify(log);
    }
    console.log(color, `${this.dateTime.getDate()} - ${out}`);
  }

  info(log: string | unknown): void {
    this.log(Colors.blue, log);
  }

  warn(log: string | unknown): void {
    this.log(Colors.yellow, log);
  }

  error(log: string | unknown): void {
    this.log(Colors.red, log);
  }
}

export default new Logger(new DateTime());
