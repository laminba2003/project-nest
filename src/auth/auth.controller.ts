import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { LoginAuthGuard } from './login-auth.guard';
import { AuthService } from './auth.service';
import { User } from '../users/user';

@Controller()
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(LoginAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  register(@Body() user: User) {
    return this.authService.register(user);
  }

}