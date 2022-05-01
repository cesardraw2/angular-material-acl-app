import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Functionality } from '../acl-tree/model/functionality';
import { ItemACL } from '../acl-tree/model/item-acl';
import { ItemTree } from '../acl-tree/model/item-tree';
import { DrawerService } from '../acl-tree/service/drawer.service';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.css'],
})
export class AclComponent implements OnInit {
  showFiller = false;
  selectedRole: ItemTree = new ItemTree();
  newFunc: Functionality | null;

  @ViewChild(MatDrawer) matDrawer: MatDrawer;
  constructor(private drawerService: DrawerService) {}

  ngOnInit() {}

  onSelectedRole(role: ItemTree) {
    this.selectedRole = role;
    console.log('selectedRole>>> ', role);
    this.drawerService.toggle(this.matDrawer);
  }

  onSelectedFunc(func: Functionality) {
    console.log('onSelectedFunc>>> ', func);
    this.newFunc = func;
  }
}
