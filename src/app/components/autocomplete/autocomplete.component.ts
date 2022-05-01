import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

export interface functionalityGroup {
  letter: string;
  names: string[];
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
  return opt.map((group) =>
    group.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
  );
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
      names: [
        'Funcionalidade A1',
        'Funcionalidade A2',
        'Funcionalidade A3',
        'Funcionalidade A4',
      ],
    },
    {
      letter: 'Módulo B',
      names: [
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
          names: _filter(group.names, value, group.letter),
        }))
        .filter((group) => group.names.length > 0);
    }
    return this.functionalityGroup;
  }

  doSelect(value) {
    console.log('input >>>> ', value);
    this.onSelectedFunc.emit(find(this.functionalityGroup, value));
    this.stateForm.reset();
  }
}
