/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDTO, RegisterUserDTO } from './users.dto';
import { User } from './users.entity';
import { AuthResponse } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(user: RegisterUserDTO): Promise<AuthResponse | HttpException> {
    // validar si el usuario ya existe
    const userExists = await this.findUserByName(user.username);
    if (userExists) {
      throw new HttpException('El usuario ya existe.', 400);
    }

    // validar que las contraseñas coincidan
    if (user.password !== user.password_confirmation) {
      throw new HttpException('Las contraseñas no coinciden.', 400);
    }

    // encriptar password
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;

    // crear el usuario
    const { password, password_confirmation, ...userSaved } =
      await this.userRepository.save(user);

    return userSaved;
  }

  async login(user: LoginUserDTO): Promise<AuthResponse> {
    // validar si el usuario existe
    const userExists = await this.findUserByName(user.username);
    if (!userExists) {
      throw new HttpException('El usuario no existe.', 400);
    }

    // comparar contraseñas
    const isMatch = await bcrypt.compare(user.password, userExists.password);

    if (!isMatch) {
      throw new HttpException('Credenciales invalidas.', 400);
    }

    // borrar password
    const { password, ...userSaved } = userExists;

    return userSaved;
  }

  async findUserByName(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async getProfile(id: number): Promise<AuthResponse | HttpException> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('El usuario no existe.', 404);
    }
    return user;
  }

  async countUsers(): Promise<number> {
    const users = await this.userRepository.find();
    return users.length;
  }
}
