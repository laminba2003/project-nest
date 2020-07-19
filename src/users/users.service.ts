import { Injectable } from '@nestjs/common';
import { User } from './user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(username: string): Promise<User> {
    return this.userModel.findOne({username: username}).exec();
  }

  async createUser(user : User): Promise<User> {
    return this.userModel.create(user);
  }

}
