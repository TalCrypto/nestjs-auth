import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [CoreModule, CatsModule, DatabaseModule],
})
export class AppModule {}
