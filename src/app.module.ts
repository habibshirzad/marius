import { Logger, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/Joi'
import { DatabaseModule } from './users/module/database/database.module';
import { UsersModule } from './users/module/users.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './middleLogger/logger.middleware';



@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        // ELASTIC_NODE: Joi.number().required(),
        PORT: Joi.number(),
      })
    }),
  
    DatabaseModule,
    UsersModule,
    
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
}
}