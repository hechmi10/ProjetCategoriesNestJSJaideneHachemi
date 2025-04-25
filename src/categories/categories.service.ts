/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private CategoryModel:Model<Category>) {}
  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new this.CategoryModel(createCategoryDto);
    return newCategory.save();
  }

  findAll() {
    return this.CategoryModel.find().exec();
  }

  findOne(id: string) {
    return this.CategoryModel.findById(id).exec();
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.CategoryModel.findByIdAndUpdate(id, updateCategoryDto).exec();
  }
  remove(id: string) {
    return this.CategoryModel.findByIdAndDelete(id).exec();
  }
}
