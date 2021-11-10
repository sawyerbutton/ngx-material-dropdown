import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaterialDropdownModule } from 'ngx-material-dropdown';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMaterialDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
