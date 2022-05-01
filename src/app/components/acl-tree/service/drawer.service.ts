import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  toggle(matDrawer) {
    matDrawer.toggle();
  }
}