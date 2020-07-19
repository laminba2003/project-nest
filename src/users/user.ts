import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {

    @Prop({ required: true })
    @ApiProperty({
        description: 'The user first name'
    })
    firstName: string;
    
    @Prop({ required: true })
    @ApiProperty({
        description: 'The user last name'
    })
    lastName: string;

    @Prop({ required: true })
    @ApiProperty({
        description: 'The user login name'
    })
    username: string;

    @Prop({ required: true })
    @ApiProperty({
        description: 'The user login password'
    })
    password: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);