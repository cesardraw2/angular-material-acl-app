import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Functionality } from '../acl-tree/model/functionality';

export interface functionalityGroup {
  letter: string;
  functionalities: Functionality[];
}
export const _filter = (
  opt: string[],
  value: string,
  group: string
): string[] => {
  return opt.filter(
    (item) =>
      item.toLowerCase().includes(value.toLowerCase()) ||
      group.toLowerCase().includes(value.toLowerCase())
  );
};

export const find = (opt: any[], value: string): string[] => {
  return opt.map((group) => {
    console.log('group :: ', group);
    return group.functionalities.filter((item) => {
      console.log('item :: ', item);
      return item.toLowerCase().includes(value.toLowerCase());
    });
  });
};

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Output() onSelectedFunc = new EventEmitter<any>();

  stateForm: FormGroup = this._formBuilder.group({
    functionalityGroup: '',
  });

  functionalityGroup: functionalityGroup[] = [
    {
      letter: 'Módulo A',
      functionalities: [
        { name: 'Funcionalidade A1' },
        'Funcionalidade A2',
        'Funcionalidade A3',
        'Funcionalidade A4',
      ],
    },
    {
      letter: 'Módulo B',
      functionalities: [
        'Funcionalidade B1',
        'Funcionalidade B2',
        'Funcionalidade B3',
        'Funcionalidade B4',
        'Funcionalidade BXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
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
    console.log('input >>>> ', value);
    const item = find(this.functionalityGroup, value);
    console.log('item >>>> ', item);
    this.onSelectedFunc.emit(item);
    this.stateForm.reset();
  }
}
