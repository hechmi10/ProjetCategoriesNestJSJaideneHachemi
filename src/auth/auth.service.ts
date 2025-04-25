/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
            const { password, ...result } = (user as any).toObject();
            return result;
        }
        return null;
    }

    login(user:any){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const payload={username:user.username,sub:user._id,role:user.role};
        return {
            access_token:this.jwtService.sign(payload),
        };
    }
    async register(username: string, password: string, role: string = 'user') {
        return this.userService.create(username, password, role);
    }
}
