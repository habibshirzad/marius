import { Body, Inject, Injectable, Param ,Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { WinstonLogger } from 'nest-winston';


@Injectable()
export class UsersService {
     logger = new Logger
    
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,  
        // private readonly logger = new Logger(UsersService.name)

    ){}
    
    
    async create(createUserDto:CreateUserDto){
        const newUser =  this.usersRepository.create(createUserDto)
        this.logger.log(newUser);
        // this.logger.debug('test...')
        return await this.usersRepository.save(newUser) 

    }


    async update(id:number,updateUserDto:UpdateUserDto){
        // const user = await this.findOne(id);
        // user.name = updateUserDto.name;
        return await this.usersRepository.update(id,{
            ...updateUserDto
        })
    }
    

    async findAll(){
        // this.logger.('getHello is triggered!');
        return await this.usersRepository.find()
    }

    async findOne(id: number){
        return await this.usersRepository.findOne(id);
    }

    


}
