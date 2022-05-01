import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Functionality } from '../acl-tree/model/functionality';

@Component({
  selector: 'app-acl-list',
  templateUrl: './acl-list.component.html',
  styleUrls: ['./acl-list.component.scss'],
})
export class AclListComponent implements OnInit {
  funcListTmp: Functionality[];

  displayedColumns: string[] = ['select', 'name', 'enabled'];
  dataSource: MatTableDataSource<Functionality>;
  selection = new SelectionModel<Functionality>(true, []);

  @Input()
  set doRemoveItems(remove: boolean) {
    if (remove) {
      this.removeItems();
    }
  }

  @Input()
  set funcList(_funcList: Functionality[]) {
    console.log('funcList $$$$$ ', _funcList);
    this.funcListTmp = _funcList;
    this.dataSource = new MatTableDataSource<Functionality>(this.funcListTmp);
    ///this.dataSource = new MatTableDataSource(_funcList);
  }

  @Input()
  set newFunc(func: Functionality) {
    console.log('func $$$$$', func);
    if (null !== func) {
      this.funcListTmp.push(func);
      this.dataSource = new MatTableDataSource<Functionality>(this.funcListTmp);
    }
  }

  @Output() onSelectedItem = new EventEmitter<number>();

  constructor() {
    this.dataSource = new MatTableDataSource<Functionality>(this.funcListTmp);
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
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
    this.dataSource = new MatTableDataSource<Functionality>(this.funcListTmp);
  }
}
