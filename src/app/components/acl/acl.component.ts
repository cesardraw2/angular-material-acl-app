import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  DoCheck,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AclService } from '../../common/service/acl.service';
import { AclListComponent } from '../acl-list/acl-list.component';
import { ACLTreeComponent } from '../acl-tree/acl-tree.component';
import { Functionality } from '../acl-tree/model/functionality';
import { ItemTree } from '../acl-tree/model/item-tree';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { DrawerService } from './service/drawer.service';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.css'],
})
export class AclComponent implements OnInit, DoCheck {
  @ViewChild(MatDrawer) matDrawer: MatDrawer;
  @ViewChild(ACLTreeComponent) aclTreeComponent: ACLTreeComponent;
  @ViewChild(AclListComponent) aclListComponent: AclListComponent;
  @ViewChild(AutocompleteComponent)
  autocompleteComponent: AutocompleteComponent;

  showFiller = false;
  selectedRole: ItemTree = new ItemTree();
  showRemoveAclItem: boolean = false;

  constructor(
    private drawerService: DrawerService,
    private aclService: AclService
  ) {}

  ngDoCheck(): void {
    if (this.aclTreeComponent !== undefined) {
      this.aclTreeComponent.service = this.aclService;
    }
  }

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
