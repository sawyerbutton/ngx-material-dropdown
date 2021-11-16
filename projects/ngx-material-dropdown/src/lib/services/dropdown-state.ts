import {EventEmitter, Injectable} from '@angular/core';
import { MenuItemComponent } from '../components/menu-item/menu-item.component';

@Injectable()
export class DropdownState {
  public onItemSelected: EventEmitter<MenuItemComponent> =
    new EventEmitter<MenuItemComponent>();
  public onItemClicked: EventEmitter<MenuItemComponent> =
    new EventEmitter<MenuItemComponent>();
  public onItemDestroyed: EventEmitter<MenuItemComponent> =
    new EventEmitter<MenuItemComponent>();

  private _selectedItem: MenuItemComponent | undefined;

  /**
   * @name selectedItem
   * @desc getter for _selectedItem
   */
  public get selectedItem(): MenuItemComponent | undefined {
    return this._selectedItem;
  }

  /**
   * @name selects a menu item and emits event
   * @param item
   */
  public select(
    item: MenuItemComponent | undefined,
    dispatchEvent = true
  ): void {
    this._selectedItem = item;
    if (!dispatchEvent || !item) {
      return;
    }

    item.focus();
    this.onItemSelected.emit(item);
  }

  /**
   * @name unselect
   * @desc sets _selectedItem as undefined
   */
  public unselect(): void {
    this._selectedItem = undefined;
  }
}
