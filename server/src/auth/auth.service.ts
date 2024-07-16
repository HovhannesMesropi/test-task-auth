import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/sign-up.dto';
import { HashingService } from '../core/services/hashing.service';
import { SignInUserDTO } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async createUser(user: CreateUserDto) {
    user.password = await this.hashingService.hashPassword(user.password);
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
  }

  async createTokens(userInfo: SignInUserDTO) {
    const user = await this.usersRepository.findOne({
      where: {
        email: userInfo.email,
      },
    });

    if (!user) {
      throw new Error('user not exists');
    }
    const isValidPassword = await this.hashingService.comparePasswords(
      userInfo.password,
      user.password,
    );

    if (isValidPassword) {
      const token = await this.jwtService.signAsync(
        { userId: user.id },
        { expiresIn: '10m' },
      );

      const refreshToken = await this.jwtService.signAsync(
        { userId: user.id },
        { expiresIn: '60m' },
      );

      await this.usersRepository.update(user.id, { token, refreshToken });

      return {
        token,
        refreshToken,
      };
    } else {
      throw new Error('invalid password');
    }
  }

  async recreateTokens(refreshToken: string) {
    const user = await this.usersRepository.findOne({
      where: {
        refreshToken,
      },
    });

    if (!user) {
      throw new Error('invalid refresh token');
    }

    const token = await this.jwtService.signAsync(
      { userId: user.id },
      { expiresIn: '10m' },
    );

    const newRefreshToken = await this.jwtService.signAsync(
      { userId: user.id },
      { expiresIn: '60m' },
    );

    await this.usersRepository.update(user.id, {
      token,
      refreshToken: newRefreshToken,
    });

    return {
      token,
      newRefreshToken,
    };
  }

  async findUserByToken(token) {
    return await this.usersRepository.findOne({ where: { token } });
  }

  async userInfo(token) {
    const user = await this.usersRepository.findOne({ where: { token } });

    delete user.password;
    delete user.token;
    delete user.refreshToken;

    return user;
  }
}
