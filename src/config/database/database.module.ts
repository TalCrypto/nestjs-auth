import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const NODE_ENV = configService.get<string>('NODE_ENV');
        const DB_HOST = configService.get<string>('DB_HOST');
        const DB_PORT = configService.get<number>('DB_PORT');
        const DB_NAME_DEV = configService.get<string>('DB_NAME_DEV');
        const DB_NAME_TEST = configService.get<string>('DB_NAME_TEST');
        const DB_NAME = NODE_ENV === "test" ? DB_NAME_TEST : DB_NAME_DEV;
        const DB_USER = configService.get<string>('DB_USER');
        const DB_PASSWORD = configService.get<string>('DB_PASSWORD');

        return {
          type: 'postgres',
          host: DB_HOST,
          port: DB_PORT,
          username: DB_USER,
          password: DB_PASSWORD,
          database: DB_NAME,
          entities: [
              __dirname + '/../**/*.entity{.ts,.js}',
          ],
          autoLoadEntities: true,
          synchronize: true,
        }
      }
    })
  ]
})
export class DatabaseModule {}
