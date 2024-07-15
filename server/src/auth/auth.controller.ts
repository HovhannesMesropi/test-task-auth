import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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

      return tokens;
    } catch (err) {
      console.log('sign-in', err);
      return 'Invalid email or password';
    }
  }

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.createUser(createUserDto);

      return true;
    } catch (err) {
      console.log('sign-up', err);
      return 'User already exists';
    }
  }

  @Post('refresh-tokens')
  async refreshTokens(@Body() refreshTokenDTO: RefreshTokenDTO) {
    try {
      return await this.authService.recreateTokens(
        refreshTokenDTO.refreshToken,
      );
    } catch (err) {
      console.log('refresh-tokens', err);
      return 'invalid refresh token';
    }
  }

  @Get('get-users')
  @UseGuards(AuthGuard)
  getUsers(): string {
    return 'Hello World';
  }
}
