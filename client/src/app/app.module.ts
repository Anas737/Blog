import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';

import { AppComponent } from './app.component';
import { ProtectedModule } from './protected';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, ProtectedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
