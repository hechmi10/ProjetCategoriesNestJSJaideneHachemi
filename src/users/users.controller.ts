/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService) {}

    @Post('create-user')
    create(@Body() createUserDto: User): Promise<User> {
        return this.userService.create(createUserDto.username, createUserDto.password,createUserDto.role);
    }

    @Get('find-user/:username')
    findByUsername(@Param('username') username: string): Promise<User | undefined> {
        return this.userService.findByUsername(username);
    }
}
