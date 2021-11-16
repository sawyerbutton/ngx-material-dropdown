import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { TestModule, BasicDropdown } from './test-helper';

function getComponent(fixture: any, component: any) {
  fixture.detectChanges();
  return fixture.debugElement.query(By.directive(component))
    .componentInstance;
}

// Copy from original spec file
describe('DropdownComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, NoopAnimationsModule, TestModule],
    })
    .compileComponents();
  });

  describe('when the controller is instantiated', () => {
    it('has its properties defined', () => {
      const fixture: ComponentFixture<BasicDropdown> = TestBed.createComponent(BasicDropdown);
      const component = getComponent(fixture, DropdownComponent);
      expect(component.button).toBeDefined();
      expect(component.menu).toBeDefined();
      expect(component.dynamicUpdate).toBeDefined();
      expect(component.dynamicUpdate).toBeTruthy();
      expect(component.onItemClicked).toBeDefined();
      expect(component.onItemSelected).toBeDefined();
      expect(component.menu.items.length).toEqual(2);
      expect(component.state.menuState.isVisible).toBe(false);
    });

    it('has its unique output properties defined', () => {
      const fixture: ComponentFixture<BasicDropdown> = TestBed.createComponent(BasicDropdown);
      const component = getComponent(fixture, DropdownComponent);
      component.ngOnInit();
      expect(component.onShow).toBeDefined();
      expect(component.onHide).toBeDefined();
    })

    it('shows/hides dropdown menu', () => {
      const fixture: ComponentFixture<BasicDropdown> = TestBed.createComponent(BasicDropdown);
      const component = getComponent(fixture, DropdownComponent);

      component.button.toggleMenu();
      expect(component.state.menuState.isVisible).toEqual(true);

      component.button.toggleMenu();
      expect(component.state.menuState.isVisible).toEqual(false);

      component.hide();
      expect(component.state.menuState.isVisible).toEqual(false);

      component.show();
      expect(component.state.menuState.isVisible).toEqual(true);
    });
  });

  describe('when using keyboard keys', () => {
    let keyUp: Event = new Event('keyup');
    let keyDown: Event = new Event('keydown');
    let enter: Event = new Event('enter');
    let tab: Event = new Event('tab');

    // @ts-ignore
    keyUp['keyCode'] = 38;
    // @ts-ignore
    keyDown['keyCode'] = 40;
    // @ts-ignore
    enter['keyCode'] = 13;
    // @ts-ignore
    tab['keyCode'] = 9;

    it('goes through the dropdown items', fakeAsync(() => {
      const fixture: ComponentFixture<BasicDropdown> = TestBed.createComponent(BasicDropdown);
      const component = getComponent(fixture, DropdownComponent);

      component.show();

      fixture.detectChanges();
      tick();

      expect(component.state.dropdownState.selectedItem).toBe(
        component.menu.items.toArray()[0]
      );

      component.menu.handleKeypress(keyDown);

      fixture.detectChanges();
      tick();

      expect(component.state.dropdownState.selectedItem).toBe(
        component.menu.items.toArray()[1]
      );

      component.menu.handleKeypress(keyUp);

      expect(component.state.dropdownState.selectedItem).toBe(
        component.menu.items.toArray()[0]
      );

      component.menu.handleKeypress(tab);
      expect(component.state.dropdownState.selectedItem).toBe(
        component.menu.items.toArray()[1]
      );
    }));

    it('fires click event when pressing enter', fakeAsync(() => {
      const fixture: ComponentFixture<BasicDropdown> = TestBed.createComponent(BasicDropdown);
      const component = getComponent(fixture, DropdownComponent);

      // show menu and press element with preventClose attribute set to true
      component.show();

      component.menu.handleKeypress(keyDown);
      expect(component.state.dropdownState.selectedItem).toBe(
        component.menu.items.toArray()[1]
      );

      // press enter
      component.menu.handleKeypress(enter);

      // menu is visible
      expect(component.state.menuState.isVisible).toEqual(true);
    }));
  });

  describe('when scroll the window', () => {
    it('window scroll will adjust menu\'s position', fakeAsync(() => {
      const fixture: ComponentFixture<BasicDropdown> = TestBed.createComponent(BasicDropdown);
      const component = getComponent(fixture, DropdownComponent);
      window.dispatchEvent(new Event('scroll'));
      tick();
      expect(component.menu.position).toEqual(component.button.getPosition());
    }))
  });
});
