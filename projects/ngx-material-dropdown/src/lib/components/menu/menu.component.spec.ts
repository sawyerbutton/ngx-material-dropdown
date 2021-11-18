import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import {BrowserModule, By} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {BasicMenu, TestModule} from "./test-helper";
import {DropdownStateService} from "../../services/dropdown-state.service";
import {DropdownState} from "../../services/dropdown-state";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let service: DropdownStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, NoopAnimationsModule, TestModule],
      providers: [DropdownStateService, DropdownState]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DropdownStateService);
    fixture.detectChanges();
  });


  describe('when the menu is instantiated', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should has its properties defined and init', () =>{
      expect(component.width).toBeDefined();
      expect(component.focusFirstElement).toBeDefined();
      expect(component.offset).toBeDefined();
      expect(component.appendToBody).toBeDefined();
      expect(component.zIndex).toBeDefined();
      expect(component.width).toBe(4);
      expect(component.focusFirstElement).toBeTruthy();
      expect(component.offset).toBe('');
      expect(component.appendToBody).toBeTruthy();
      expect(component.zIndex).toBe(1000);
    })
  });
});
