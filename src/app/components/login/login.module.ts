import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginBannerComponent } from './components/login-banner/login-banner.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { HomeModule } from './../home/home.module';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, LoginBannerComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    HomeModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class LoginModule {}
