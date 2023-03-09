/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Post,
  HttpException,
  Put,
  Get,
  Param,
} from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from './users.dto';
import { AuthResponse } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('register')
  registerUser(
    @Body() user: RegisterUserDTO,
  ): Promise<AuthResponse | HttpException> {
    return this.UsersService.register(user);
  }

  @Put('login')
  loginUser(@Body() user: LoginUserDTO): Promise<AuthResponse | HttpException> {
    return this.UsersService.login(user);
  }

  @Get('profile/:id')
  getProfile(@Param() params): Promise<AuthResponse | HttpException> {
    return this.UsersService.getProfile(params.id);
  }

  @Get('count')
  countUsers(): Promise<number> {
    return this.UsersService.countUsers();
  }
}
