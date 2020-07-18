import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('This is an API to create and view books')
    .setVersion('1.0')
    .addTag('books')
    .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, options));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
