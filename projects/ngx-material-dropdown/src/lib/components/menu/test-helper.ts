import { Component, NgModule } from '@angular/core';
import { NgxMaterialDropdownModule } from '../../ngx-material-dropdown.module';

@Component({
  selector: 'basic-menu',
  template: `
    <main>
        <ngx-dropdown-menu [focusFirstElement]="true">
          <ngx-dropdown-menu-item> First item </ngx-dropdown-menu-item>
          <ngx-dropdown-menu-item [preventClose]="true">
            Second item
          </ngx-dropdown-menu-item>
        </ngx-dropdown-menu>
    </main>
  `,
})
export class BasicMenu {
  ngOnInit() {}
  ngOnDestroy() {}
}

@NgModule({
  declarations: [BasicMenu],
  imports: [NgxMaterialDropdownModule],
  exports: [NgxMaterialDropdownModule, BasicMenu],
})
export class TestModule {}
