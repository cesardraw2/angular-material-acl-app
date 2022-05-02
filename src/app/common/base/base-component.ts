import { Component, Input, OnDestroy } from '@angular/core';
import {
  interval,
  Observable,
  PartialObserver,
  Subject,
  Subscription,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

import { IService } from '../interface/IService';

@Component({
  template: '<p>BaseComponent</p>',
})
export class BaseComponent implements OnDestroy {
  protected _service: IService;
  protected hasInitialized: boolean = false;
  protected isItitializing: boolean = true;
  subscriptions: Subscription[] = [];
  unsubscribeAll: Subject<any> = new Subject<any>();
  timer$: Observable<number>;
  timerObserver: PartialObserver<number>;
  stopClick$ = new Subject();
  protected resolveService: Boolean = true;

  constructor() {
    this.autoVerify();
  }

  autoVerify(): void {
    this.timer$ = interval(1000).pipe(takeUntil(this.stopClick$));

    this.timerObserver = {
      next: (_: number) => {
        if (this._service === undefined && this.resolveService) {
          console.log('autoVerify...');
        } else {
          console.log('Parando autoVerify...');
          this.stopClick$.next(true);
          this.isItitializing = false;
          this.hasInitialized = true;
          this.init();
        }
      },
    };

    this.timer$.subscribe(this.timerObserver);
  }

  @Input() set service(pService: IService) {
    if (!this.hasInitialized && pService !== undefined) {
      this.hasInitialized = true;
      this._service = pService;
    }
  }

  protected init() {
    console.log('Init...');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
