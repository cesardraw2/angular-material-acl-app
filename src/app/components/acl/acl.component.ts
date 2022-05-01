import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AclListComponent } from '../acl-list/acl-list.component';
import { Functionality } from '../acl-tree/model/functionality';
import { ItemACL } from '../acl-tree/model/item-acl';
import { ItemTree } from '../acl-tree/model/item-tree';
import { DrawerService } from '../acl-tree/service/drawer.service';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.css'],
})
export class AclComponent implements OnInit {
  @ViewChild(MatDrawer) matDrawer: MatDrawer;
  @ViewChild(AclListComponent) aclListComponent: AclListComponent;
  @ViewChild(AutocompleteComponent)
  autocompleteComponent: AutocompleteComponent;

  showFiller = false;
  selectedRole: ItemTree = new ItemTree();
  showRemoveAclItem: boolean = false;

  constructor(private drawerService: DrawerService) {}

  ngOnInit() {}

  onSelectedRole(role: ItemTree) {
    this.aclListComponent.funcList = role.functionalities;
    this.drawerService.toggle(this.matDrawer);
    this.autocompleteComponent.doReset = true;
  }

  onSelectedFunc(func: Functionality) {
    this.aclListComponent.newFunc = func;
  }

  onSelectedAclItem(totalSelecteds: number) {
    this.showRemoveAclItem = totalSelecteds > 0;
  }

  doRemoveAclItems() {
    this.aclListComponent.doRemoveItems = true;
  }
}
