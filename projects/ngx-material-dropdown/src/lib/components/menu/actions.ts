import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from './menu.component';
import { DropdownState } from '../../services/dropdown-state';

const KEYS = {
  BACKSPACE: 9,
  PREV: 38,
  NEXT: 40,
  ENTER: 13,
  ESCAPE: 27,
};

/**
 * @name onSwitchNext
 * @param index
 * @param items
 * @param state
 */
const onSwitchNext = (
  index: number,
  items: MenuItemComponent[],
  state: DropdownState
) => {
  if (index < items.length - 1) {
    state.select(items[index + 1], true);
  }
};

/**
 * @name onSwitchPrev
 * @param index
 * @param items
 * @param state
 */
const onSwitchPrev = (
  index: number,
  items: MenuItemComponent[],
  state: DropdownState
) => {
  if (index > 0) {
    state.select(items[index - 1], true);
  }
};

/**
 * @name onBackspace
 * @param index
 * @param items
 * @param state
 */
const onBackspace = (
  index: number,
  items: MenuItemComponent[],
  state: DropdownState
) => {
  if (index < items.length - 1) {
    state.select(items[index + 1], true);
  } else {
    state.select(items[0], true);
  }
};

function onEscape(this: MenuComponent) {
  this.hide();
}

/**
 * @name onItemClicked
 * @param index
 * @param items
 * @param state
 */
const onItemClicked = (
  index: number,
  items: MenuItemComponent[],
  state: DropdownState
) => {
  return state.selectedItem ? state.selectedItem.click() : undefined;
};

export const ACTIONS = {
  [KEYS.BACKSPACE]: onBackspace,
  [KEYS.PREV]: onSwitchPrev,
  [KEYS.NEXT]: onSwitchNext,
  [KEYS.ENTER]: onItemClicked,
  [KEYS.ESCAPE]: onEscape,
};

export function arrowKeysHandler(event: KeyboardEvent): void {
  if ([38, 40].indexOf(event.keyCode) > -1) {
    event.preventDefault();
  }
}
