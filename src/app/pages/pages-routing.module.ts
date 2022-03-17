import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { StockManagementComponent } from './stock-management/stock-management.component';
import { WorkOrderStatusComponent } from './work-order-status/work-order-status.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard'])

const routes: Routes = [
  {path:'', component:PagesComponent,children: [
    {path:'login', component: LoginComponent, canActivate:[AuthGuard], data:{authGuardPipe:redirectLoggedInToDashboard}},
    {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
    {path:'work-order', component: WorkOrderComponent, canActivate:[AuthGuard]},
    {path:'stock-management', component: StockManagementComponent, canActivate:[AuthGuard]},
    {path:'work-order-status', component: WorkOrderStatusComponent, canActivate:[AuthGuard]},
    {path:'', redirectTo:'dashboard', pathMatch:'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
