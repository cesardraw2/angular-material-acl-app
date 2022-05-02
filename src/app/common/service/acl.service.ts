import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IService } from '../interface/IService';

@Injectable()
export class AclService implements IService {
  constructor(private http: HttpClient) {}

  resolve() {
    return this.getACLlist();
  }

  async getACLlist() {
    //@TODO remover MOOCK quando  pegar com o DRAW/Rafa de onde vem os dados
    const request = this.http.get<any>('assets/roles.json');

    const result = await lastValueFrom(request);
    console.log('result>>> ', result);
    return <any[]>result;
  }
}
