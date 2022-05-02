import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ItemTree } from '../../components/acl-tree/model/item-tree';
import { IService } from '../interface/IService';

@Injectable()
export class AclService implements IService {
  constructor(private http: HttpClient) {}

  resolve() {
    return this.getACLlist();
  }

  async getACLlist(): Promise<ItemTree[]> {
    const request = this.http.get<ItemTree[]>('assets/roles.json');

    const result = await lastValueFrom(request);
    console.log('result>>> ', result);
    return result;
  }
}
