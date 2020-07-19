import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiProduces } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {

    constructor(private service : BooksService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'The public books has been successfully retrieved.'})
    @ApiProduces('application/json')
    async getPublicBooks(): Promise<Book[]> {
        return this.service.getPublicBooks();
    }

    @UseGuards(JwtAuthGuard)
    @Get("private")
    @ApiResponse({ status: 200, description: 'The private books has been successfully retrieved.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiProduces('application/json')
    async getPrivateBooks(): Promise<Book[]> {
        return this.service.getPrivateBooks();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'The book has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 500, description: 'Validation failed.'})
    @ApiConsumes('application/json')
    @ApiBody({
        description: 'The book to create',
        type: Book,
    })
    @ApiProduces('application/json')
    async createBook(@Body() book: Book): Promise<Book> {
        return this.service.createBook(book);
    }

}