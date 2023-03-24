import Colors from "./ColorsEnum";

export default interface ILogger {
  log(color: Colors, log: string | unknown): void;
  info(log: string | unknown): void;
  warn(log: string | unknown): void;
  error(log: string | unknown): void;
}
