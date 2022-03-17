import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { PagesComponent } from './pages.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EditWorkOrderComponent } from './edit-work-order/edit-work-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockManagementComponent } from './stock-management/stock-management.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { QuantityDisplayComponent } from './quantity-display/quantity-display.component';
import { WorkOrderTableComponent } from './work-order-table/work-order-table.component';
import { WorkOrderStatusComponent } from './work-order-status/work-order-status.component';
import { EditWorkOrderStatusComponent } from './edit-work-order-status/edit-work-order-status.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AlertBoxComponent } from '../alert-box/alert-box.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WorkOrderComponent,
    PagesComponent,
    EditWorkOrderComponent,
    StockManagementComponent,
    UpdateStockComponent,
    QuantityDisplayComponent,
    WorkOrderComponent,
    WorkOrderTableComponent,
    WorkOrderStatusComponent,
    EditWorkOrderStatusComponent,
    LoginComponent,
    AlertBoxComponent
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
