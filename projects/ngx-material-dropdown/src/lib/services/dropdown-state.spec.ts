import { TestBed } from '@angular/core/testing';
import { DropdownState } from './dropdown-state';
// import {Component, NO_ERRORS_SCHEMA} from "@angular/core";
import {MenuItemComponent} from "../components/menu-item/menu-item.component";

describe('DropdownState', () => {
  let dropdown: DropdownState;
  let comp: any;
  beforeEach( () => {
    // const spy = jasmine.createSpyObj('MockMenuItemComponent', ['focus']);
    TestBed.configureTestingModule({
      declarations: [MenuItemComponent],
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        DropdownState,
        {provide: MenuItemComponent, useClass: MenuItemStubComponent}
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    // Inject both the service-to-test and its (spy) dependency
    dropdown = TestBed.inject(DropdownState);
    comp = TestBed.inject(MenuItemComponent);
  });

  it('should be created', () => {
    expect(dropdown).toBeTruthy();
  })

  it('should have it\'s getter property assigned', () => {
    expect(dropdown.selectedItem).toBeUndefined();
    expect(dropdown.onItemSelected).toBeDefined();
    expect(dropdown.onItemClicked).toBeDefined();
    expect(dropdown.onItemDestroyed).toBeDefined();
  })

  it('should have private _selectedItem to be undefined after unselect function called', () => {
    dropdown.unselect();
    expect(dropdown.selectedItem).toBeUndefined();
  })

  it('should have private _selectedItem to be undefined after select function called with params [undefined, true| false]', () => {
    dropdown.select(undefined, true);
    expect(dropdown.selectedItem).toBeUndefined();
    dropdown.select(undefined, false);
    expect(dropdown.selectedItem).toBeUndefined();
  })

  it('should have onItemSelected emit called after select function called with params [menuItem, true]',  () => {
    spyOn(dropdown.onItemSelected,'emit');
    dropdown.select(comp, true);
    expect(dropdown.onItemSelected.emit).toHaveBeenCalledWith(comp);
  })

  it('should have onItemSelected emit called after select function called with params [menuItem, false]',  () => {
    spyOn(dropdown.onItemSelected,'emit');
    dropdown.select(comp, false);
    expect(dropdown.onItemSelected.emit).toHaveBeenCalledTimes(0);
  })

  // it('should have MenuItem focus function called after select function called with params [menuItem, true]', async () => {
  //   await dropdown.select(comp, true)
  //   expect(spyOn(comp, 'focus')).toHaveBeenCalledTimes(1);
  // })

  // it('should have MenuItem focus function called after select function called with params [menuItem, false]', () => {
  //   spyOn(dropdown, 'select').withArgs(comp, false);
  //   expect(comp.focus).toHaveBeenCalled();
  // })
});

// @Component({
//   selector: "ngx-dropdown-menu-item",
//   template: "",
// })
class MenuItemStubComponent{
  public focus() {}
}
