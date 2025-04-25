/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) { } 

    @Post('login')
    login(@Body() body) {
        const user= this.authService.validateUser(body.username, body.password);
        if(!user) throw new Error('Invalid credentials');
        return this.authService.login(user);
    }

    @Post('register')
    register(@Body() body) {
        
        return this.authService.register(body.username, body.password, body.role);
    }
}
