/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { RolesGuard } from 'src/auth/rolesGuard';
import { Roles } from 'src/auth/roles';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

   
  @UseGuards(RolesGuard,JwtAuthGuard)
  @Roles('admin')
  @Post('create-category')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-all-categories')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('find-category/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(RolesGuard,JwtAuthGuard)
  @Roles('admin')
  @Put('update-category/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(RolesGuard,JwtAuthGuard)
  @Roles('admin')
  @Delete('delete-category/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
