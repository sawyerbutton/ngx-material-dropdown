import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import {BrowserModule, By} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {BasicMenu, TestModule} from "./test-helper";

function getComponent(fixture: any, component: any) {
  fixture.detectChanges();
  return fixture.debugElement.query(By.directive(component))
    .componentInstance;
}

describe('MenuComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, NoopAnimationsModule, TestModule],
    })
      .compileComponents();
  });


  describe('when the menu is instantiated', () => {
    it('should create', () => {
      const fixture: ComponentFixture<BasicMenu> = TestBed.createComponent(BasicMenu);
      const component = getComponent(fixture, MenuComponent);
      expect(component).toBeTruthy();
    });

    it('should has its properties defined and init', () =>{
      const fixture: ComponentFixture<BasicMenu> = TestBed.createComponent(BasicMenu);
      const component = getComponent(fixture, MenuComponent);
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
