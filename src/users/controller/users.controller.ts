import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Patch, Post, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { UsersService } from '../service/users.service';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { AppController } from 'src/app.controller';


@Controller('users')
export class UsersController {
    // logger : Logger

    constructor(private readonly userService:UsersService,
        // private readonly logger = new Logger(UsersController.name)
        ){}


    @Post()
    create(@Body() createUserDto:CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Get()
    findAll() {
        // this.logger.verbose('Getting stuff');
        return this.userService.findAll()  
    }

    @Get(':id')
    findOne(@Param('id')  id:number){
        return this.userService.findOne(Number(id))    
    }

    
    
    @Patch(':id')
    update(@Param('id') id:number, @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id,updateUserDto)
    }

    // @Delete(':id')
    // remove(@Param('id') id:string){
    //     return this.userService.remove(+id);
    // }

} 
