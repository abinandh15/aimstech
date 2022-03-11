import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';

const routes: Routes = [
  {path:'', component:PagesComponent,children: [
    {path:'dashboard', component: DashboardComponent},
    {path:'work-order-details', component: WorkOrderDetailsComponent},
    {path:'', redirectTo:'dashboard', pathMatch:'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
