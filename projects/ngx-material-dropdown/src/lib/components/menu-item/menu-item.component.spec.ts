import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItemComponent } from './menu-item.component';
import {DropdownStateService} from "../../services/dropdown-state.service";

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;
  let stateService: jasmine.SpyObj<DropdownStateService>

  beforeEach(async () => {

    // const spy = jasmine.createSpyObj('DropdownStateService', ['menuState', 'state']);

    await TestBed.configureTestingModule({
      declarations: [ MenuItemComponent ],
      providers: [
        // {provide: DropdownStateService, useValue: spy }
      ]
    }).overrideComponent(
      MenuItemComponent,
      {set: {providers: [{provide: DropdownStateService, useClass: DropDownStateServiceSpy}]}})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    stateService = TestBed.inject(DropdownStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have public properties defined', () => {
    expect(component.preventClose).toBeDefined();
    expect(component.value).toBeDefined();
  })
});


class DropDownStateServiceSpy {
  menuState = jasmine.createSpyObj('menuState', ['isVisible', 'toString']);
  dropdownState = jasmine.createSpy('dropdownState');
}
