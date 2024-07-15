import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('sign-in')
  signIn(): string {
    return 'Hello World';
  }

  @Post('sign-up')
  signUp(): string {
    return 'Hello World';
  }

  @Get('get-user/:id')
  getUser(): string {
    return 'Hello World';
  }

  @Get('get-users')
  getUsers(): string {
    return 'Hello World';
  }
}
