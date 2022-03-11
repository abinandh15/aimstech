import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { firstValueFrom, Observable, take } from 'rxjs';
import { WorkOrder } from 'src/app/models/work-order';
import { WorkOrderService } from 'src/app/services/work-order.service';
import { QuantityDisplayComponent } from '../quantity-display/quantity-display.component';
import { UpdateStockComponent } from '../update-stock/update-stock.component';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.scss']
})
export class StockManagementComponent implements OnInit, OnDestroy {
  orders: WorkOrder[] | undefined;
  tableData: LocalDataSource = new LocalDataSource();
  tableSettings: object = {};
  isSelected: boolean = false;
  selectedRow: WorkOrder | undefined;
  subscription: any;
  workOrders$!: Observable<WorkOrder[]>;
  constructor(public workorderserv: WorkOrderService, protected dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.tableSettings = {
      actions: false,
      columns:{
        workOrderNumber:{
          title: "Work Order",
          width: '50%',
          filter: false
        },
        quantity:{
          title: "Quantity",
          filter: false
        },
        status: {
          title: "Status",
          filter: false,
        }
      }
    }
    this.updateTable();
  }

  async updateTable(){
    // this.subscription = await this.workorderserv.getWorkOrders().subscribe((workOrders: WorkOrder[]) => {
    //   this.orders = workOrders;
    //   this.tableData = new LocalDataSource(this.orders)
    // })
    this.workOrders$ = await this.workorderserv.getWorkOrders();
  }

  async selectRow({isSelected, data}: any){
    console.log(data)
    if(isSelected){
      const workOrderDialog = await this.dialogService.open(UpdateStockComponent, {
        context:{
          selectedWorkOrder: data
        }
      })
      const response = await firstValueFrom(workOrderDialog.onClose);
      if(!!response){
        await this.updateTable()
      }
    }
  }

  ngOnDestroy(): void {
    
  }

}
