import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiProduces, ApiHeader, ApiOperation } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {

    constructor(private booksService : BooksService) {}

    @Get()
    @ApiOperation({ summary: 'Retrieve the list of public books' })
    @ApiResponse({ status: 200, description: 'The public books have been successfully retrieved.', type : [Book] })
    @ApiProduces('application/json')
    async getPublicBooks(): Promise<Book[]> {
        return this.booksService.getPublicBooks();
    }

    @UseGuards(JwtAuthGuard)
    @Get("private")
    @ApiOperation({ summary: 'Retrieve the list of private books' })
    @ApiHeader({
        name: 'Authorization',
        description: 'The Bearer JWT token.',
    })
    @ApiResponse({ status: 200, description: 'The private books have been successfully retrieved.', type : [Book]})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiProduces('application/json')
    async getPrivateBooks(): Promise<Book[]> {
        return this.booksService.getPrivateBooks();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create a book' })
    @ApiHeader({
        name: 'Authorization',
        description: 'The Bearer JWT token.',
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'The Bearer JWT token.',
    })
    @ApiResponse({ status: 201, description: 'The book has been successfully created.', type : Book})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 500, description: 'Validation failed.'})
    @ApiConsumes('application/json')
    @ApiBody({
        description: 'The book to create',
        type: Book,
    })
    @ApiProduces('application/json')
    async createBook(@Body() book: Book): Promise<Book> {
        return this.booksService.createBook(book);
    }

}