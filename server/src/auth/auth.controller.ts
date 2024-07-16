import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInUserDTO } from './dto/sign-in.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInUserDTO: SignInUserDTO) {
    try {
      const tokens = await this.authService.createTokens(signInUserDTO);

      return {
        body: tokens,
        message: 'success',
        status: true,
      };
    } catch (err) {
      console.log('sign-in', err);
      return {
        message: 'Invalid email or password',
        status: false,
      };
    }
  }

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.createUser(createUserDto);

      return {
        message: 'User created',
        status: true,
      };
    } catch (err) {
      console.log('sign-up', err);
      return {
        message: 'User already exists',
        status: false,
      };
    }
  }

  @Post('refresh-tokens')
  async refreshTokens(@Body() refreshTokenDTO: RefreshTokenDTO) {
    try {
      const tokens = await this.authService.recreateTokens(
        refreshTokenDTO.refreshToken,
      );

      return {
        body: tokens,
        message: 'success',
        status: true,
      };
    } catch (err) {
      console.log('refresh-tokens', err);
      return {
        message: 'invalid refresh token',
        status: false,
      };
    }
  }

  @Get('user-info')
  @UseGuards(AuthGuard)
  async getUser(@Headers() headers) {
    return this.authService.userInfo(headers.token);
  }
}
