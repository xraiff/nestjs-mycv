import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import * as crypto from 'crypto';

// Have to do this because of incomptibilities betweeen nest and express
const cookieSession = require('cookie-session');

// Easiest way to get the database name to change based on the environment
// database: (process.env.NODE_ENV === 'test') ? 'test.sqlite' : 'db.sqlite',

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`,
  }), UsersModule, ReportsModule, 
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        synchronize: true,
        entities: [User, Report],
      };
    }
  })],
  //TypeOrmModule.forRoot({
  //  type: 'sqlite',
   // database: ConfigService.get('DATABASE_NAME'),
    //entities: [User, Report],
    //synchronize: true,
  //})],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      })
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: ['asdfasdklfk']
      })
    ).forRoutes('*');
  }
}
