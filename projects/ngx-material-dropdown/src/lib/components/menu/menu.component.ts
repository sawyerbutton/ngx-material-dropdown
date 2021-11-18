import { Component, OnDestroy, OnInit, Input, ContentChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  state,
} from '@angular/animations';
import { ACTIONS, arrowKeysHandler } from './actions';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { DropdownStateService } from '../../services/dropdown-state.service';

@Component({
  selector: 'ngx-dropdown-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1, height: '*', width: '*' })),
      state(
        'hidden',
        style({ opacity: 0, overflow: 'hidden', height: 0, width: 0 })
      ),
      transition('hidden => visible', [
        animate(
          '250ms ease-in',
          style({ opacity: 1, height: '*', width: '*' })
        ),
      ]),
      transition('visible => hidden', [
        animate('350ms ease-out', style({ opacity: 0, width: 0, height: 0 })),
      ]),
    ]),
    trigger('opacity', [
      transition('hidden => visible', [
        animate(
          '450ms ease-in',
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 1, offset: 1 }),
          ])
        ),
      ]),
      transition('visible => hidden', [
        animate(
          '250ms ease-out',
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0.5, offset: 0.3 }),
            style({ opacity: 0, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class MenuComponent implements OnInit, OnDestroy {
  /**
   * @name width
   */
  @Input() public width = 4;

  /**
   * @description if set to true, the first element of the dropdown will be automatically focused
   * @name focusFirstElement
   */
  @Input() public focusFirstElement = true;

  /**
   * @description sets dropdown offset from the button
   * @name offset {string} follow format '<number> <number>' ex. '0 20'
   */
  @Input() public offset: string = '';

  /**
   * @name appendToBody
   */
  @Input() public appendToBody = true;

  /**
   * @name zIndex
   */
  @Input() public zIndex = 1000;

  /**
   * @name items
   */
  @ContentChildren(MenuItemComponent, { descendants: true })
  public items!: QueryList<MenuItemComponent>;

  private position: ClientRect | undefined;

  private listeners = {
    arrowHandler: () => {},
    handleKeypress: () => {},
  };

  constructor(
    public dropdownState: DropdownStateService,
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const dc = typeof document !== 'undefined' ? document : undefined;
    if (this.appendToBody) {
      // append menu element to the body
      dc?.body.appendChild(this.element.nativeElement);
    }
  }

  /**
   * @name show
   * @shows menu and selects first item
   */
  public show(position?: ClientRect, dynamic = true): void {
    const dc = typeof document !== 'undefined' ? document : undefined;
    const wd = typeof window !== 'undefined' ? window : undefined;

    if (!this.dropdownState.menuState.isVisible) {
      // setting handlers
      this.listeners.handleKeypress = this.renderer.listen(
        dc?.body,
        'keydown',
        this.handleKeypress.bind(this)
      );
      this.listeners.arrowHandler = this.renderer.listen(
        wd,
        'keydown',
        arrowKeysHandler
      );
    }

    // update state
    this.dropdownState.menuState.isVisible = true;

    if (position) {
      this.updatePosition(position, dynamic);
    }
  }

  /**
   * @name hide
   * @desc hides menu
   */
  public hide(): void {
    this.dropdownState.menuState.isVisible = false;

    // reset selected item state
    this.dropdownState.dropdownState.unselect();

    // call function to un-listen
    this.listeners.arrowHandler && this.listeners.arrowHandler();
    this.listeners.handleKeypress && this.listeners.handleKeypress();
  }

  /**
   * @name updatePosition
   * @desc updates the menu position every time it is toggled
   * @param position {ClientRect}
   * @param dynamic {boolean}
   */
  public updatePosition(position: ClientRect, dynamic: boolean): void {
    this.position = position;
    this.updateOnChange(dynamic);
  }

  /**
   * @name handleKeypress
   * @desc executes functions on keyPress based on the key pressed
   * @param $event
   */
  public handleKeypress($event: KeyboardEvent): void {
    const key = $event.keyCode;
    const items = this.items.toArray();
    const index = items.indexOf(this.dropdownState.dropdownState.selectedItem!);

    if (!ACTIONS.hasOwnProperty(key)) {
      return;
    }

    ACTIONS[key].call(this, index, items, this.dropdownState.dropdownState);
  }

  /**
   * @name getMenuElement
   */
  private getMenuElement(): Element {
    return this.element.nativeElement.children[0];
  }

  /**
   * @name calcPositionOffset
   * @param position
   */
  private calcPositionOffset(position: any): { top: string; left: string } {
    const wd = typeof window !== 'undefined' ? window : undefined;
    const dc = typeof document !== 'undefined' ? document : undefined;

    if (!wd || !dc || !position) {
      return {top : '', left: ''};
    }

    const element = this.getMenuElement();
    const supportPageOffset = wd.pageXOffset !== undefined;
    const isCSS1Compat = (dc.compatMode || '') === 'CSS1Compat';

    const x = supportPageOffset
      ? wd.pageXOffset
      : isCSS1Compat
      ? dc.documentElement.scrollLeft
      : dc.body.scrollLeft;

    const y = supportPageOffset
      ? wd.pageYOffset
      : isCSS1Compat
      ? dc.documentElement.scrollTop
      : dc.body.scrollTop;

    let { top, left } = this.applyOffset(
      `${position.top + (this.appendToBody ? y - 15 : 0)}px`,
      `${position.left + x - 5}px`
    );

    const clientWidth = element.clientWidth;
    const clientHeight = element.clientHeight;

    const marginFromBottom =
      parseInt(top) + clientHeight + (this.appendToBody ? 0 : y - 15);
    const marginFromRight = parseInt(left) + clientWidth;

    const windowScrollHeight = wd.innerHeight + wd.scrollY;
    const windowScrollWidth = wd.innerWidth + wd.scrollX;

    if (marginFromBottom >= windowScrollHeight) {
      top = `${parseInt(top.replace('px', '')) - clientHeight}px`;
    }

    if (marginFromRight >= windowScrollWidth) {
      const marginRight = marginFromRight - windowScrollWidth + 30;
      left = `${parseInt(left.replace('px', '')) - marginRight}px`;
    }

    return { top, left };
  }

  private applyOffset(
    top: string,
    left: string
  ): { top: string; left: string } {
    if (!this.offset) {
      return { top, left };
    }

    const offset = this.offset.split(' ');

    if (!offset[1]) {
      offset[1] = '0';
    }

    top = `${parseInt(top.replace('px', '')) + parseInt(offset[0])}px`;
    left = `${parseInt(left.replace('px', '')) + parseInt(offset[1])}px`;

    return { top, left };
  }

  public updateOnChange(dynamic = true) {
    const element = this.getMenuElement();
    const position = this.calcPositionOffset(this.position);

    if (position) {
      this.renderer.setStyle(element, 'top', position.top.toString());
      this.renderer.setStyle(element, 'left', position.left.toString());
    }

    // select first item unless user disabled this option
    if (
      this.focusFirstElement &&
      this.items.first &&
      !this.dropdownState.dropdownState.selectedItem
    ) {
      this.dropdownState.dropdownState.select(this.items.first, false);
    }
  }

  ngOnDestroy() {
    const elem = this.element.nativeElement;
    elem.parentNode.removeChild(elem);

    if (this.listeners.handleKeypress) {
      this.listeners.handleKeypress();
    }
  }
}
