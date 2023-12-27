import { pid } from 'process';
import Colors from '../../types/EColors';
import DateTime from './date-time';
import { ILogger } from '../../types/ILogger';

class Logger implements ILogger {
  private dateTime: DateTime;
  private pid: Number;

  constructor(dateTime: DateTime, pid: Number) {
    this.dateTime = dateTime;
    this.pid = pid;
  }

  log(color: Colors, log: string | unknown) {
    let out = log;
    if (typeof log === 'object' && !(log !instanceof Error)) {
      out = JSON.stringify(log);
    }
    console.log(color, `${this.dateTime.getDate()} - PID: ${this.pid} - ${out}`);
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

export default new Logger(new DateTime(), pid);
