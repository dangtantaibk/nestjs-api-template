import { LoggerService } from '@nestjs/common';

/**
 * Custom log formatter that ensures all logs are single-line
 */
export class CustomLoggerService implements LoggerService {
  log(message: any, context?: string): void {
    this.formatAndLog('LOG', message, context);
  }

  error(message: any, trace?: string, context?: string): void {
    this.formatAndLog('ERROR', message, trace, context);
  }

  warn(message: any, context?: string): void {
    this.formatAndLog('WARN', message, context);
  }

  debug(message: any, context?: string): void {
    this.formatAndLog('DEBUG', message, context);
  }

  verbose(message: any, context?: string): void {
    this.formatAndLog('VERBOSE', message, context);
  }

  private formatAndLog(level: string, message: any, trace?: string, context?: string): void {
    const timestamp = new Date().toISOString();
    const formattedContext = context ? `[${context}]` : '';
    
    let formattedMessage: string;
    if (typeof message === 'object') {
      formattedMessage = JSON.stringify(message);
    } else {
      formattedMessage = message;
    }
    
    const logEntry = `[Nest] ${process.pid} - ${timestamp} ${level.padEnd(7)} ${formattedContext} ${formattedMessage}`;
    console.log(logEntry);
    
    if (trace) {
      console.log(trace);
    }
  }
}