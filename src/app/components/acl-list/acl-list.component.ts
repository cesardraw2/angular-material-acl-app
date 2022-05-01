import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Functionality } from '../acl-tree/model/functionality';
import { ItemACL } from '../acl-tree/model/item-acl';

@Component({
  selector: 'app-acl-list',
  templateUrl: './acl-list.component.html',
  styleUrls: ['./acl-list.component.css'],
})
export class AclListComponent implements OnInit {
  @Input()
  set funcList(_funcList: Functionality[]) {
    console.log('funcList $$$$$ ', _funcList);
    this.funcListTmp = _funcList;
    this.dataSource = new MatTableDataSource<Functionality>(this.funcListTmp);
  }

  funcListTmp: Functionality[];

  displayedColumns: string[] = ['name', 'enabled'];
  dataSource;
  selection = new SelectionModel<Functionality>(true, []);

  constructor() {
    this.dataSource = new MatTableDataSource<Functionality>(this.funcListTmp);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
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
      this.funcList.indexOf(row as never) + 1
    }`;
  }
}
