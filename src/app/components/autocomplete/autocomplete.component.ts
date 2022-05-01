import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
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
    console.log('group :: ', group);
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
export class AutocompleteComponent implements OnInit {
  @Output() onSelectedFunc = new EventEmitter<Functionality>();
  @Input() set doReset(i) {
    this.stateForm.reset();
  }

  stateForm: FormGroup = this._formBuilder.group({
    functionalityGroup: '',
  });

  functionalityGroup: functionalityGroup[] = [
    {
      letter: 'Módulo A',
      functionalities: [
        { name: 'Funcionalidade A1', enabled: true, expandable: false },
        { name: 'Funcionalidade A2', enabled: true, expandable: false },
        { name: 'Funcionalidade A3', enabled: true, expandable: false },
        { name: 'Funcionalidade A4', enabled: true, expandable: false },
      ],
    },
    {
      letter: 'Módulo B',
      functionalities: [
        { name: 'Funcionalidade B1', enabled: true, expandable: false },
        { name: 'Funcionalidade B2', enabled: true, expandable: false },
        { name: 'Funcionalidade B3', enabled: true, expandable: false },
        { name: 'Funcionalidade B4_XXX', enabled: true, expandable: false },
      ],
    },
  ];
  functionalityGroupOptions: Observable<functionalityGroup[]>;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.functionalityGroupOptions = this.stateForm
      .get('functionalityGroup')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGroup(value))
      );
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
    console.log('item XXXXXXX: ', item);
    this.onSelectedFunc.emit(item);
    this.stateForm.reset();
  }
}
