import { EventEmitter } from '@angular/core';
import { IService } from '../interface/IService';

export interface IbaseComponent {
  set service(pService: IService);
}
