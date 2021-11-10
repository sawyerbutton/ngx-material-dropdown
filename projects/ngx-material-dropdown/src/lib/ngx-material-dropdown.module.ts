import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ButtonComponent,
    DropdownComponent,
    MenuComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    ButtonComponent,
    DropdownComponent,
    MenuComponent,
    MenuItemComponent
  ]
})
export class NgxMaterialDropdownModule { }
