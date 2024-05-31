import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(createBookDto: any): Promise<Book> {
    const book = new this.bookModel(createBookDto);
    return book.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
}
