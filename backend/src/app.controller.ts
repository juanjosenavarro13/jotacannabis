import { GetInfoModel } from './app.model';
import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private AppService: AppService) {}

  @Get('info')
  getInfo(): Promise<GetInfoModel> {
    return this.AppService.getInfo();
  }
}
