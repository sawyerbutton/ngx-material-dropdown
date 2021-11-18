import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItemComponent } from './menu-item.component';
import {DropdownStateService} from "../../services/dropdown-state.service";
import {DropdownState} from "../../services/dropdown-state";
import {Injectable} from "@angular/core";

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;
  let service: DropdownStateService;
  // let stateService: jasmine.SpyObj<DropdownStateService>

  beforeEach(async () => {

    // const spy = jasmine.createSpyObj('DropdownStateService', ['menuState', 'state']);

    await TestBed.configureTestingModule({
      declarations: [ MenuItemComponent ],
      providers: [
        DropdownStateService,
        DropdownState
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DropdownStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have public properties defined', () => {
    expect(component.preventClose).toBeDefined();
    expect(component.value).toBeUndefined();
  })

  it('should emit value on click', () => {
    spyOn(service.dropdownState.onItemClicked, 'emit');
    const nativeElement = fixture.nativeElement;
    const div = nativeElement.querySelector('div.ngx-menu-item');
    div.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(service.dropdownState.onItemClicked.emit).toHaveBeenCalledWith(component);
  })

  it('should emit value on mouseover', () => {
    spyOn(service.dropdownState, 'select');
    const nativeElement = fixture.nativeElement;
    const div = nativeElement.querySelector('div.ngx-menu-item');
    div.dispatchEvent(new Event('mouseover'));
    fixture.detectChanges();
    expect(service.dropdownState.select).toHaveBeenCalledWith(component, true);
  })
});
