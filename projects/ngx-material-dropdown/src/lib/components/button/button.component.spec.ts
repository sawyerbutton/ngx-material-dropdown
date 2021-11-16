import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have properties defined', () => {
    expect(component.showCaret).toBeDefined();
    expect(component.onMenuToggled).toBeDefined();
  })

  it('should have public properties showCaret to be true', () => {
    expect(component.showCaret).toBeTruthy();
  })

  it('should emit value on click', () => {
    spyOn(component.onMenuToggled, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.onMenuToggled.emit).toHaveBeenCalledWith(true);
  })

  it('should call getPosition with result', () => {
    const clientRectSpy = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      top : 50,
      right : 705.5,
      bottom : 290,
      left : 265.5,
      toJSON() : void {}
    };
    const nativeElement = fixture.nativeElement;
    spyOn(nativeElement, 'getBoundingClientRect').and.returnValue(clientRectSpy);
    expect(component.getPosition()).toBe(clientRectSpy);
  });
});
