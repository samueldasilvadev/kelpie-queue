import Colors from '../types/enums/EColors';
import ILogger from '../types/interfaces/ILogger';
import DateTime from './date-time';

class Logger implements ILogger {
  private dateTime: DateTime;

  constructor(dateTime: DateTime) {
    this.dateTime = dateTime;
  }

  log(color: Colors, log: string | unknown) {
    let out = log;
    if (typeof log === 'object' && !(log !instanceof Error)) {
      out = JSON.stringify(log);
    }
    console.log(color, `${this.dateTime.getDate()} - ${out}`);
  }

  info(log: string | object): void {
    this.log(Colors.blue, log);
  }

  warn(log: string | object): void {
    this.log(Colors.yellow, log);
  }

  error(log: string | object | unknown): void {
    if (log instanceof Error) {
      this.log(Colors.red, log.stack);
      return;
    }
    this.log(Colors.red, log);
  }
}

export default new Logger(new DateTime());
