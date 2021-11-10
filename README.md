# Angular Dropdown Component

Material-like dropdown component for Angular Version 13.

Upgraded from ng2-material-dropdown.

## Install

    npm install ngx-material-dropdown --save

## Usage

Once installed, import the directives and use it in your container component:

```html
<ngx-dropdown>
    <ngx-dropdown-button>
        Open Menu
    </ngx-dropdown-button>
    <ngx-dropdown-menu>
        <ngx-dropdown-menu-item *ngFor="let page of pages">
            {{ page }}
        </ngx-dropdown-menu-item>

        <div class='ng2-menu-divider'></div>

        <ngx-dropdown-menu-item>
            With Divider
        </ngx-dropdown-menu-item>
    </ngx-dropdown-menu>
</ngx-dropdown>
```

```javascript
// import module
import { NgxMaterialDropdownModule } from 'ngx-material-dropdown';

@NgModule({
    imports: [ NgxMaterialDropdownModule ]
    // ..
})
export class MyModule {}
```

## API

`ngx-dropdown`
- **`dynamicUpdate`** - **`[?boolean]`** : option to disable the dynamic update of the position on scroll events (defaults to `true`)
- **`onItemSelected()`** - **`[(onItemSelected($event)]`** : event that emits the currently selected/hovered item
- **`onItemClicked()`** - **`[(onItemClicked($event)]`** : event that emits the item clicked on
- **`onShow()`** - **`[(onItemClicked($event)]`** : event that emits when the dropdown gets shown
- **`onHide()`** - **`[(onItemClicked($event)]`** : event that emits when the dropdown gets hidden

`ngx-dropdown-menu`
- **`focusFirstElement`** - **`[?boolean]`** : by default the first element is immediately focused. You can disable by setting this option to false
- **`width`** - **`[?number]`**: this determines the width of the menu. Possible values are 2, 4 and 6. By default, this is set to 4
- **`offset`** - **`[?string]`**: offset to adjust the position of the dropdown with absolute values
- **`appendToBody`** - **`[?boolean]`** : by default the dropdown is appended to the body, but you can disable this by setting it to `false`


`ngx-dropdown-button`
- **`showCaret`** - **`[?boolean]`** : if present, a caret will be appended to the button's text

`ngx-dropdown-menu-item`
- **`preventClose`** - `[?boolean]` : if present, this attribute prevents the menu to hide when the menu item is clicked
- **`value` - `[?any]`** : any value that you may want to attach to a menu item. Useful for using this component with other components.
