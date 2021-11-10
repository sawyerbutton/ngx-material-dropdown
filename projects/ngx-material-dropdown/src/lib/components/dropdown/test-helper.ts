import { Component, NgModule } from '@angular/core';
import { NgxMaterialDropdownModule } from '../../ngx-material-dropdown.module';

@Component({
  selector: 'basic-dropdown',
  template: `
    <main>
      <ngx-dropdown>
        <ngx-dropdown-button> Open </ngx-dropdown-button>
        <ngx-dropdown-menu [focusFirstElement]="true">
          <ngx-dropdown-menu-item> First item </ngx-dropdown-menu-item>
          <ngx-dropdown-menu-item [preventClose]="true">
            Second item
          </ngx-dropdown-menu-item>
        </ngx-dropdown-menu>
      </ngx-dropdown>
    </main>
  `,
})
export class BasicDropdown {
  ngOnInit() {}
}

@NgModule({
  declarations: [BasicDropdown],
  imports: [NgxMaterialDropdownModule],
  exports: [NgxMaterialDropdownModule, BasicDropdown],
})
export class TestModule {}
