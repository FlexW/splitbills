import { Injectable } from '@angular/core';

enum LogLevel {
  Debug = 1,
  Info = 2,
  Warning = 3,
  Error = 4,
}

@Injectable({
  providedIn: 'root',
})
export class LogService {
  debug(tag: string, msg: any): void {
    this.log(LogLevel.Debug, tag, msg);
  }

  info(tag: string, msg: any): void {
    this.log(LogLevel.Info, tag, msg);
  }

  warning(tag: string, msg: any): void {
    this.log(LogLevel.Warning, tag, msg);
  }

  error(tag: string, msg: any): void {
    this.log(LogLevel.Error, tag, msg);
  }

  private log(level: LogLevel, tag: string, msg: any): void {
    console.log(LogLevel[level] + ' (' + tag + ') ' + JSON.stringify(msg));
  }
}
