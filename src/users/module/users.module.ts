import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/middleLogger/logger.middleware';
import { UsersController } from '../controller/users.controller';
import { User } from '../entity/user.entity';
import { UsersService } from '../service/users.service';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[UsersController],
    providers:[UsersService, Logger],
    // exports:[Logger]
})
export class UsersModule {}
