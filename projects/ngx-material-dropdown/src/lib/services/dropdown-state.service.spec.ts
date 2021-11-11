import { TestBed } from '@angular/core/testing';

import { DropdownStateService } from './dropdown-state.service';
import { DropdownState } from './dropdown-state';

describe('DropdownStateService', () => {
  let service: DropdownStateService;
  let dropDownStateSpy: jasmine.SpyObj<DropdownState>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DropdownStateService] });
    service = TestBed.inject(DropdownStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
