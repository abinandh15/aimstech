import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { StockManagementComponent } from './stock-management/stock-management.component';
import { WorkOrderComponent } from './work-order/work-order.component';

const routes: Routes = [
  {path:'', component:PagesComponent,children: [
    {path:'dashboard', component: DashboardComponent},
    {path:'work-order', component: WorkOrderComponent},
    {path:'stock-management', component: StockManagementComponent},
    {path:'work-order-status', component: StockManagementComponent},
    {path:'', redirectTo:'dashboard', pathMatch:'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
