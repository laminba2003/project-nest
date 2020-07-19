import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { LoginAuthGuard } from './login-auth.guard';
import { AuthService } from './auth.service';
import { User } from '../users/user';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiProduces, PickType, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {

  constructor(private authService: AuthService) { }

  @UseGuards(LoginAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'Authenticate the user in order to generate an access token' })
  @ApiResponse({ status: 201, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiBody({
    description: 'the user credentials sent in the payload.',
    type: class Login extends PickType(User, ['username', 'password']) { },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  @ApiOperation({ summary: 'Register the user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.', type : User })
  @ApiResponse({ status: 409, description: 'The user is already registered.'})
  @ApiConsumes('application/json')
  @ApiBody({
    description: 'The user to register',
    type: User,
  })
  @ApiProduces('application/json')
  async register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

}