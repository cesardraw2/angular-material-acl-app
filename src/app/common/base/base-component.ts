import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil, tap, timer } from 'rxjs';

import { IService } from '../interface/IService';

@Component({
  template: '<p>BaseComponent</p>',
})
export class BaseComponent implements OnDestroy {
  protected _service: IService;
  protected hasInitialized: boolean = false;
  subscriptions: Subscription[] = [];
  unsubscribeAll: Subject<any> = new Subject<any>();
  stopInitiVerify$: Subject<any> = new Subject();

  constructor() {
    // this.autoVerify();
    this.stopInitiVerify$.subscribe(() => {
      this.init();
    });
  }

  autoVerify(): void {
    if (!this.hasInitialized) {
      const autoPlayInter = timer(0, 2000)
        .pipe(
          takeUntil(this.stopInitiVerify$),
          tap((_) => this._service === undefined)
        )
        .subscribe();
    } else {
      this.stopInitiVerify$.next(true); // this stops the timer
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
