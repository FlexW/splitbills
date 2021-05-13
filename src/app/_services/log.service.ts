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
  debug(tag: string, msg: string, ...params: any[]): void {
    console.log(params.length);
    this.log(LogLevel.Debug, tag, msg, params);
  }

  info(tag: string, msg: string, ...params: any[]): void {
    this.log(LogLevel.Info, tag, msg, params);
  }

  warning(tag: string, msg: string, ...params: any[]): void {
    this.log(LogLevel.Warning, tag, msg, params);
  }

  error(tag: string, msg: string, ...params: any[]): void {
    this.log(LogLevel.Error, tag, msg, params);
  }

  private log(level: LogLevel, tag: string, msg: string, params: any[]): void {
    const logStatement = this.buildLogStatement(level, tag, msg, params);
    console.log(logStatement);
  }

  private buildLogStatement(
    level: LogLevel,
    tag: string,
    msg: string,
    params: any[]
  ): string {
    console.log(params.length);
    let logStatement = `${LogLevel[level]} (${tag}) ${msg}`;

    if (params.length != 0) {
      logStatement += ' ' + this.formatExtraParams(params);
    }

    return logStatement;
  }

  private formatExtraParams(params: any[]): string {
    let ret: string = params.join(',');

    // Is there at least one object in the array?
    if (params.some((p) => typeof p == 'object')) {
      ret = '';

      // Build comma-delimited string
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }
}
