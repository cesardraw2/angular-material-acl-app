import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '../../common/base/base-component';
import { IbaseComponent } from '../../common/base/ibase-component';
import { Functionality } from '../acl-tree/model/functionality';

@Component({
  selector: 'app-acl-list',
  templateUrl: './acl-list.component.html',
  styleUrls: ['./acl-list.component.scss'],
})
export class AclListComponent
  extends BaseComponent
  implements IbaseComponent, OnInit
{
  funcListTmp: Functionality[];

  displayedColumns: string[] = ['select', 'name', 'enabled'];
  dataSource: MatTableDataSource<Functionality> =
    new MatTableDataSource<Functionality>([]);
  selection = new SelectionModel<Functionality>(true, []);

  @Input()
  set doRemoveItems(remove: boolean) {
    if (remove) {
      this.removeItems();
    }
  }

  @Input()
  set funcList(_funcList: Functionality[]) {
    this.funcListTmp = _funcList;
    this.setDatasource();
  }

  @Input()
  set newFunc(func: Functionality) {
    if (null !== func) {
      this.funcListTmp.push(func);
      this.setDatasource();
    }
  }

  @Output() onSelectedItem = new EventEmitter<number>();

  constructor() {
    super();
    this.resolveService = false;
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  init(): void {
    this.setDatasource();
  }

  setDatasource() {
    this.dataSource = new MatTableDataSource<Functionality>(this.funcListTmp);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;

    this.onSelectedItem.emit(numSelected);

    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Functionality): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      this.funcListTmp.indexOf(row as never) + 1
    }`;
  }

  removeItems() {
    this.selection.selected.forEach((item) => {
      this.funcListTmp.splice(this.funcListTmp.indexOf(item as never), 1);
    });
    this.setDatasource();
  }
}
