import { Observable } from 'rxjs';
import { apiConstants } from './../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetInfoModel } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getInfo(): Observable<GetInfoModel> {
    return this.http.get<GetInfoModel>(apiConstants.info);
  }
}
