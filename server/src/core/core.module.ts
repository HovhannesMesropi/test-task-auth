import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dotEnvConfig } from 'dotenv';
import { User } from 'src/entities/user.entity';

dotEnvConfig();

const ORM = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_LOGIN,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});

const JWT = JwtModule.register({
  secret: process.env.SECRET,
});

const EntitiesForFeature = TypeOrmModule.forFeature([User]);

@Module({
  imports: [ORM, JWT, EntitiesForFeature],
  controllers: [],
  providers: [],
  exports: [ORM, JWT, EntitiesForFeature],
})
export class CoreModule {}
