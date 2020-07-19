import { Injectable } from '@nestjs/common';
import { Book } from './book';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksService {

    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    async getPublicBooks(): Promise<Book[]> {
        return this.bookModel.find({public: true}).exec();
    }

    async getPrivateBooks(): Promise<Book[]> {
        return this.bookModel.find({public: false}).exec();
    }

    async createBook(book : Book): Promise<Book> {
        return this.bookModel.create(book);
    }

}
