/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true,unique: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop({default:'user'})
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);