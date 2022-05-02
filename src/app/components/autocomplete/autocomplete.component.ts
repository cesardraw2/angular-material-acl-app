import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { BaseComponent } from '../../common/base/base-component';
import { IbaseComponent } from '../../common/base/ibase-component';
import { Functionality } from '../acl-tree/model/functionality';

export interface functionalityGroup {
  letter: string;
  functionalities: Functionality[];
}
export const _filter = (
  opt: Functionality[],
  value: string,
  group: string
): Functionality[] => {
  return opt.filter(
    (item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      group.toLowerCase().includes(value.toLowerCase())
  );
};

export const find = (opt: any[], value: string): Functionality => {
  let functionality: Functionality;
  opt.map((group) => {
    group.functionalities.filter((item) => {
      if (item.name.toLowerCase().includes(value.toLowerCase())) {
        functionality = item;
        return;
      }
    });
  });
  return functionality;
};

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent
  extends BaseComponent
  implements IbaseComponent, OnInit
{
  @Output() onSelectedFunc = new EventEmitter<Functionality>();
  @Input() set doReset(i) {
    this.stateForm.reset();
  }

  stateForm: FormGroup = this._formBuilder.group({
    functionalityGroup: '',
  });

  functionalityGroup: functionalityGroup[] = [];

  functionalityGroupOptions: Observable<functionalityGroup[]>;

  constructor(private _formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.functionalityGroupOptions = this.stateForm
      .get('functionalityGroup')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGroup(value))
      );
  }

  protected init() {
    this.functionalityGroup = this._service.resolve();
  }
  private _filterGroup(value: string): functionalityGroup[] {
    if (value) {
      return this.functionalityGroup
        .map((group) => ({
          letter: group.letter,
          functionalities: _filter(group.functionalities, value, group.letter),
        }))
        .filter((group) => group.functionalities.length > 0);
    }
    return this.functionalityGroup;
  }

  doSelect(value) {
    const item = find(this.functionalityGroup, value);
    this.onSelectedFunc.emit(item);
    this.stateForm.reset();
  }
}
