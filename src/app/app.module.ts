import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {StyleUtils,StylesheetMap,MediaMarshaller,ɵMatchMedia,BreakPointRegistry,PrintHook,LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,FlexOrderStyleBuilder} from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StyleUtils,StylesheetMap,MediaMarshaller,ɵMatchMedia,BreakPointRegistry,PrintHook,LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,FlexOrderStyleBuilder,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    fakeBackendProvider 
  ],
  entryComponents:[LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
