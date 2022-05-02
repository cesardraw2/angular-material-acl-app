import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IService } from '../interface/IService';

@Injectable()
export class FunctionalitiesService implements IService {
  constructor(private http: HttpClient) {}

  resolve() {
    return this.getACLlist();
  }

  async getACLlist() {
    const request = this.http.get<any>('assets/functionalities.json');

    const result = await lastValueFrom(request);
    console.log('result>>> ', result);
    return <any[]>result;
  }
}
