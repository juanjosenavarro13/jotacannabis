import { UsersService } from './users/users.service';
import { Injectable } from '@nestjs/common';
import { GetInfoModel } from './app.model';

@Injectable()
export class AppService {
  constructor(private UsersService: UsersService) {}

  async getInfo(): Promise<GetInfoModel> {
    return {
      users: await this.UsersService.countUsers(),
    };
  }
}
