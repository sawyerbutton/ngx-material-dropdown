import { Component, OnInit, ContentChild, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MenuComponent } from '../menu/menu.component';
import { DropdownStateService } from '../../services/dropdown-state.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'ngx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [DropdownStateService]
})
export class DropdownComponent implements OnInit {
  // get children components
  @ContentChild(ButtonComponent, { static: true })
  public button!: ButtonComponent;
  @ContentChild(MenuComponent, { static: true })
  public menu!: MenuComponent;

  @Input() public dynamicUpdate = true;

  // outputs
  @Output() public onItemClicked: EventEmitter<MenuItemComponent> = new EventEmitter<MenuItemComponent>();
  @Output() public onItemSelected: EventEmitter<MenuItemComponent> = new EventEmitter<MenuItemComponent>();
  @Output() public onShow: EventEmitter<DropdownComponent> = new EventEmitter<DropdownComponent>();
  @Output() public onHide: EventEmitter<DropdownComponent> = new EventEmitter<DropdownComponent>();

  constructor(private state: DropdownStateService) {}

  ngOnInit() {
    console.log(this);
    this.state.dropdownState.onItemClicked.subscribe((item) => {
      this.onItemClicked.emit(item);

      if (item.preventClose) {
        return;
      }

      this.hide.call(this);
    });

    if (this.button) {
      this.button.onMenuToggled.subscribe(() => {
        this.toggleMenu();
      });
    }

    this.state.dropdownState.onItemSelected.subscribe((item) => {
      this.onItemSelected.emit(item);
    });

    this.state.dropdownState.onItemDestroyed.subscribe((item: MenuItemComponent) => {
      let newSelectedItem: MenuItemComponent | undefined;
      const items = this.menu.items.toArray();

      if (item !== this.state.dropdownState.selectedItem) {
        return;
      }

      if (this.menu.focusFirstElement) {
        newSelectedItem =
          item === items[0] && items.length > 1 ? items[1] : items[0];
      }

      this.state.dropdownState.select(newSelectedItem);
    });
  }

  /**
   * @name toggleMenu
   * @desc toggles menu visibility
   */
  public toggleMenu(position = this.button.getPosition()): void {
    this.state.menuState.isVisible ? this.hide() : this.show(position);
  }

  /**
   * - hides dropdown
   * @name hide
   */
  public hide(): void {
    this.menu.hide();
    this.onHide.emit(this);
  }

  /**
   * - shows dropdown
   * @name show
   * @param position
   */
  public show(position = this.button.getPosition()): void {
    this.menu.show(position, this.dynamicUpdate);
    this.onShow.emit(this);
  }

  /**
   * @name scrollListener
   */
  @HostListener('window:scroll')
  public scrollListener() {
    if (this.button && this.dynamicUpdate) {
      this.menu.updatePosition(this.button.getPosition(), true);
    }
  }
}
