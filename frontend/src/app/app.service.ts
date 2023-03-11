import { apiConstants } from './../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetInfoModel } from './app.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private info: BehaviorSubject<GetInfoModel> =
    new BehaviorSubject<GetInfoModel>({
      usuarios: 0,
    });

  info$ = this.info.asObservable();

  constructor(private http: HttpClient) {
    this.getInfo();
  }

  getInfo(): void {
    this.http.get<GetInfoModel>(apiConstants.info).subscribe({
      next: (resp) => {
        this.info.next(resp);
      },
    });
  }
}
