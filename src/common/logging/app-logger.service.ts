import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends ConsoleLogger {
  /**
   * Override the log method to ensure single-line formatting
   */
  log(message: any): void {
    if (typeof message === 'object') {
      super.log(JSON.stringify(message));
    } else {
      super.log(message);
    }
  }

  /**
   * Override the error method to ensure single-line formatting
   */
  error(message: any, trace?: string, context?: string): void {
    if (typeof message === 'object') {
      super.error(JSON.stringify(message), trace, context);
    } else {
      super.error(message, trace, context);
    }
  }

  /**
   * Override the warn method to ensure single-line formatting
   */
  warn(message: any, context?: string): void {
    if (typeof message === 'object') {
      super.warn(JSON.stringify(message), context);
    } else {
      super.warn(message, context);
    }
  }

  /**
   * Override the debug method to ensure single-line formatting
   */
  debug(message: any, context?: string): void {
    if (typeof message === 'object') {
      super.debug(JSON.stringify(message), context);
    } else {
      super.debug(message, context);
    }
  }
}