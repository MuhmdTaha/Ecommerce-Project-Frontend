import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import { UpdateComponent } from './components/products/update/update.component';
import { AddComponent } from './components/products/add/add.component';
import { ViewItemComponent } from './components/products/view-item/view-item.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { SameUserGuardService } from './services/same-user-guard.service';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'products', component:ProductsComponent},
  {path:'orders', component:OrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path:'cart/:id', component:CartComponent, canActivate: [AuthGuardService, SameUserGuardService]}, //:id
  {path:'profile/:id', component:ProfileComponent, canActivate: [AuthGuardService, SameUserGuardService]},
  {path:'products/update/:id',component:UpdateComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path:'products/add',component:AddComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path:'products/Details/:id',component:ViewItemComponent, canActivate: [AuthGuardService]},
  {path:'no-access',component:NoAccessComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
