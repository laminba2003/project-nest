import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {

    constructor(private service : BooksService) {}

    @Get()
    getPublicBooks() {
        return this.service.getPublicBooks();
    }

    @UseGuards(JwtAuthGuard)
    @Get("private")
    getPrivateBooks() {
        return this.service.getPrivateBooks();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createBook(@Body() book: Book) {
        return this.service.createBook(book);
    }

}