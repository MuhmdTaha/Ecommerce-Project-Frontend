import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewItemComponent } from './products/view-item/view-item.component';
import { UpdateComponent } from './products/update/update.component';
import { AddComponent } from './products/add/add.component';
import { EdituserComponent } from './profile/edituser/edituser.component';
import { EdituserphotoComponent } from './profile/edituserphoto/edituserphoto.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewItemComponent,
    UpdateComponent,
    AddComponent,
    EdituserComponent,
    EdituserphotoComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NoAccessComponent,
    OrdersComponent,
    AboutComponent,
    CartComponent,
    ErrorComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
