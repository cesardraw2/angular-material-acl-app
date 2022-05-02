import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Functionality } from '../../components/acl-tree/model/functionality';
import { IService } from '../interface/IService';

@Injectable()
export class FunctionalitiesService implements IService {
  constructor(private http: HttpClient) {}

  resolve() {
    return this.getFuncList();
  }

  async getFuncList(): Promise<Functionality[]> {
    const request = this.http.get<Functionality[]>(
      'assets/functionalities.json'
    );

    const result = await lastValueFrom(request);
    console.log('result>>> ', result);
    return result;
  }
}
