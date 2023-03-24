import Colors from "./ColorsEnum";

export default interface ILogger {
  log(color: Colors, log: string | object): void;
  info(log: string | object): void;
  warn(log: string | object): void;
  error(log: string | object): void;
}
