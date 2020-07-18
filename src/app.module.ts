import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BooksModule, ConfigModule.forRoot({
    envFilePath: ['development.env', 'staging.env','production.env'],
    isGlobal: true,
  }), MongooseModule.forRoot(process.env.MONGODB_URL), AuthModule, UsersModule],
})
export class AppModule {}

