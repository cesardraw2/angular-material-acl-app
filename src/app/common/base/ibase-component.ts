import { EventEmitter } from '@angular/core';
import { IService } from '../interface/IService';
import { BaseComponent } from './base-component';

export interface IbaseComponent extends BaseComponent {
  set service(pService: IService);
}
