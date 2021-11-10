import { Injectable } from '@angular/core';
import { DropdownState } from './dropdown-state';

@Injectable()
export class DropdownStateService {
  constructor() {}

  public menuState = {
    isVisible: false,
    toString(): string {
      return this.isVisible === true ? 'visible' : 'hidden';
    },
  };

  public dropdownState = new DropdownState();
}
