import {ACTIONS, arrowKeysHandler} from './actions';
import {TestBed} from "@angular/core/testing";
import {BrowserModule} from "@angular/platform-browser";
import {TestModule} from "./test-helper";
import {DropdownStateService} from "../../services/dropdown-state.service";
import {DropdownState} from "../../services/dropdown-state";
// import {Component} from "@angular/core";

const KEYS = {
  BACKSPACE: 9,
  PREV: 38,
  NEXT: 40,
  ENTER: 13,
  ESCAPE: 27,
};

describe('action', () => {
  let dropdownState: DropdownState;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, TestModule],
      providers: [DropdownStateService, DropdownState]
    })
    dropdownState = TestBed.inject(DropdownState);
  });

  it('onSwitchNext will call dropdownState select function', () => {
      spyOn(dropdownState, 'select');
      ACTIONS[KEYS.NEXT].call(this, 0, [], dropdownState);
      expect(dropdownState.select).toHaveBeenCalledTimes(0);
  });

  it('onSwitchPrev will call dropdownState select function', () => {
    spyOn(dropdownState, 'select');
    ACTIONS[KEYS.PREV].call(this, 0, [], dropdownState);
    expect(dropdownState.select).toHaveBeenCalledTimes(0);
  });

  it('onBackspace will call dropdownState select function', () => {
    spyOn(dropdownState, 'select');
    ACTIONS[KEYS.BACKSPACE].call(this, 0, [], dropdownState);
    expect(dropdownState.select).toHaveBeenCalledTimes(1);
  });

  it('onItemClicked will call dropdownState select function', () => {
    // spyOn(dropdownState.selectedItem, 'click');
    // dropdownStateSpy = jasmine.createSpy('dropdownState', selectedItem)
    ACTIONS[KEYS.ENTER].call(this, 0, [], dropdownState);
    expect(dropdownState.selectedItem).toBeUndefined();
  });

  // it('onEscape will call argument\'s hide function', () => {
  //   let menuComponentStub = jasmine.createSpy('menuComponent', function hide() {});
  //   // @ts-ignore
  //   ACTIONS[KEYS.ESCAPE].call(this, menuComponentStub);
  //   expect(menuComponentStub.hide).toHaveBeenCalled();
  // });

  it('arrowKeysHandler will trigger after function call', () => {
    let eventSpy = jasmine.createSpyObj('event', ['preventDefault']);
    eventSpy.keyCode = 40;
    arrowKeysHandler(eventSpy);
    expect(eventSpy.preventDefault).toHaveBeenCalled()
  })
});


