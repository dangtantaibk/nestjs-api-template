import { Module, Global } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';

@Global()
@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class LoggingModule {}