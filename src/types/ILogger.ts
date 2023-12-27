import EColors from "./EColors";

export interface ILogger {
  log(color: EColors, log: string | object): void;
  info(log: string | object): void;
  warn(log: string | object): void;
  error(log: string | object): void;
}
