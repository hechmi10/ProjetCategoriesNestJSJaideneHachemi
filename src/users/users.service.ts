/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>) {}
    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ username }).exec();
        return user || undefined;
    }
    async create(username: string, password: string,role:string='user'): Promise<User> {
        const hashed=await bcrypt.hash(password,10);
        const newUser = new this.userModel({ username, password: hashed, role });
        return newUser.save();
    }
}
