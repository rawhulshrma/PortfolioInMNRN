import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BooksService } from './books.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  async create(@Body() createBookDto: any, @UploadedFile() file: Express.Multer.File) {
    createBookDto.image = file.filename;
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  async findAll() {
    return this.booksService.findAll();
  }
}
