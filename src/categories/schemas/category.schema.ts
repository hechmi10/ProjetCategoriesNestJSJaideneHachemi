/* eslint-disable prettier/prettier */
import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({required:true})
    name: string;
    
}

export const CategorySchema = SchemaFactory.createForClass(Category);
