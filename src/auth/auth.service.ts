import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    return (user && await bcrypt.compare(pass, user.password)) ? user : null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    const registeredUser = await this.usersService.getUser(user.username);
    if (registeredUser) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        message: 'this user is already registered',
      }, HttpStatus.CONFLICT); 
    } else {
      user.password = await bcrypt.hash(user.password, 10);
      const createdUser = await this.usersService.createUser(user);
      createdUser.password = "";
      return createdUser;
    }
  }

}