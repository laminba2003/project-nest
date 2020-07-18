import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Book extends Document {

    @Prop({ required: true })
    @ApiProperty({
        description: 'The book title'
    })
    title: string;

    @Prop()
    @ApiProperty({
        description: 'The book description',
        required : false
    })
    description: string;

    @Prop({ required: true })
    @ApiProperty({
        description: 'The book photo'
    })
    photo: string;

    @Prop()
    @ApiProperty({
        description: 'The book public flag',
        required : false,
        default : true
    })
    public: boolean = true;

}

export const BookSchema = SchemaFactory.createForClass(Book);