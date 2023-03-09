import { GetInfoModel } from './../../app.model';
import { AppService } from './../../app.service';
import { infoConstants } from './../../../constants/info.constants';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  infoConstants = infoConstants;
  info: GetInfoModel;

  constructor(private AppService: AppService) {
    this.info = {
      usuarios: 0,
    };
    this.getInfo();
  }

  getInfo() {
    this.AppService.getInfo().subscribe({
      next: (resp) => {
        this.info = resp;
      },
    });
  }
}
