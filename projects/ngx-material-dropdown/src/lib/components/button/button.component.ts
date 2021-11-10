import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'ngx-dropdown-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent{
  @Output() public onMenuToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public showCaret: boolean = true;

  constructor(private element: ElementRef) {}

  /**
   * @name toggleMenu
   * @desc emits event to toggle menu
   */
  public toggleMenu(): void {
    this.onMenuToggled.emit(true);
  }

  /**
   * @name getPosition
   * @desc returns position of the button
   */
  public getPosition(): ClientRect {
    return this.element.nativeElement.getBoundingClientRect();
  }
}
