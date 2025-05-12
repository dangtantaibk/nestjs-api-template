import { Logger } from '@nestjs/common';

export class LoggerUtil {
  private static sensitiveFields = ['password', 'token', 'secret', 'accessToken', 'refreshToken'];

  private static formatLogContext(message: string, context: any, startTime: number, extras: Record<string, any> = {}) {
    // Create a sanitized copy of the context
    const sanitizedContext = this.sanitizeData(JSON.parse(JSON.stringify(context || {})));
    
    return {
      message,
      ...sanitizedContext,
      ...extras,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString()
    };
  }

  private static sanitizeData(data: any): any {
    if (data === null || data === undefined) {
      return data;
    }
    
    if (typeof data === 'object') {
      if (Array.isArray(data)) {
        return data.map(item => this.sanitizeData(item));
      } else {
        const result = { ...data };
        for (const key in result) {
          if (this.sensitiveFields.includes(key)) {
            result[key] = '[REDACTED]';
          } else if (typeof result[key] === 'object' && result[key] !== null) {
            result[key] = this.sanitizeData(result[key]);
          }
        }
        return result;
      }
    }
    
    return data;
  }

  static warn(logger: Logger, message: string, context: any, startTime: number, extras: Record<string, any> = {}) {
    const formattedLog = JSON.stringify(LoggerUtil.formatLogContext(message, context, startTime, extras));
    logger.warn(formattedLog);
  }

  static error(logger: Logger, message: string, error: Error, context: any, startTime: number) {
    const errorExtras = {
      error: error.message,
      stack: error.stack
    };
    
    const formattedLog = JSON.stringify(LoggerUtil.formatLogContext(message, context, startTime, errorExtras));
    logger.error(formattedLog);
  }

  static log(logger: Logger, message: string, context: any, startTime: number, extras: Record<string, any> = {}) {
    const formattedLog = JSON.stringify(LoggerUtil.formatLogContext(message, context, startTime, extras));
    logger.log(formattedLog);
  }
  
  static debug(logger: Logger, message: string, context: any, startTime: number, extras: Record<string, any> = {}) {
    const formattedLog = JSON.stringify(LoggerUtil.formatLogContext(message, context, startTime, extras));
    logger.debug(formattedLog);
  }
}