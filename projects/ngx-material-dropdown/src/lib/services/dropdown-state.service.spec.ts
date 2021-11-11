// import { TestBed } from '@angular/core/testing';

import { DropdownStateService } from './dropdown-state.service';
import { DropdownState } from './dropdown-state';

describe('DropdownStateService', () => {
  let service: DropdownStateService;
  // let dropDownStateSpy: jasmine.SpyObj<DropdownState>;

  beforeEach(() => { service = new DropdownStateService(); });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have its properties assigned', () => {
    expect(service.menuState).toBeDefined();
    expect(service.dropdownState).toBeDefined();
  });

  it('should have menuState\'s isVisible property be false at initial state', () => {
    expect(service.menuState.isVisible).toEqual(false);
  });

  it('should have menuState\'s toString() property be hidden at initial state', () => {
    expect(service.menuState.toString()).toEqual('hidden');
  });

  it('should have menuState\'s toString() property be visible while isVisible property change to true', () => {
    service.menuState.isVisible = true;
    expect(service.menuState.toString()).toBe('visible')
  });

  it('should have menuState\'s toString() property be hiden while isVisible property change to false', () => {
    service.menuState.isVisible = false;
    expect(service.menuState.toString()).toBe('hidden')
  });
});
