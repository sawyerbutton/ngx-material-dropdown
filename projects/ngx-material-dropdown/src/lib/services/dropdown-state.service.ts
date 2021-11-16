import { Injectable } from '@angular/core';
import { DropdownState } from './dropdown-state';

@Injectable()
export class DropdownStateService {

  public menuState = {
    isVisible: false,
    toString(): string {
      return this.isVisible === true ? 'visible' : 'hidden';
    },
  };

  public dropdownState: DropdownState;

  constructor(
    private ddState: DropdownState
  ) {
    this.dropdownState = this.ddState;
  }
}
