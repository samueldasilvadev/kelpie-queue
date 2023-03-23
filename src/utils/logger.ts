import { Colors } from '../types/ColorsEnum';
import DateTime from './date-time';

export default class Logger {

  private dateTime: DateTime;
  private debugMode: boolean;

  constructor(dateTime: DateTime, debug?: boolean) {
    this.dateTime = dateTime;
    this.debugMode = debug ? debug : false;
  }

  show(color: Colors, log: string | unknown) {
    let out = log;
    if (typeof log === 'object') {
      out = JSON.stringify(log);
    }
    console.log(color, `${this.dateTime.getDate()} - ${out}`);
  }

  info(log: string): void {
    this.show(Colors.blue, log);
  }

  warn(log: string): void {
    this.show(Colors.yellow, log);
  }

  error(log: string | unknown): void {
    this.show(Colors.red, log);
  }

  debug(log: string | unknown) {
    if (this.debugMode) {
      this.show(Colors.magenta, log);
    }
  }
}
