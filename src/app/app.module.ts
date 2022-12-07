import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TodosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    FormsModule,
    ToastModule,
    HttpClientModule
  ],
  providers: [ConfirmationService, MessageService, { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
