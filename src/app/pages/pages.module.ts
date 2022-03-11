import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ListComponent,
    WorkOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbSelectModule,
    NbIconModule,
    NbMenuModule,
    NbIconModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbDialogModule.forChild()
  ]
})
export class PagesModule { }
