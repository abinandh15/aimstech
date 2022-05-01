import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { firstValueFrom, Observable, subscribeOn, take } from 'rxjs';
import { WorkOrder } from 'src/app/models/work-order';
import { WorkOrderService } from 'src/app/services/work-order.service';
import { EditWorkOrderComponent } from '../edit-work-order/edit-work-order.component';



@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})



export class WorkOrderComponent implements OnInit {

  orders: WorkOrder[] | undefined;
  tableData: LocalDataSource = new LocalDataSource();
  tableSettings: object = {};
  isSelected: boolean = false;
  selectedRow: WorkOrder | undefined;
  workOrders$!: Observable<WorkOrder[]>;

  constructor(public workorderserv: WorkOrderService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.tableSettings = {
      actions: false,      
      pager: { display: false },
      columns:{
        workOrderNumber:{
          title: "Work Order",
          width: '50%',
          filter: false
        },
        quantity:{
          title: "Quantity",
          filter: false
        }
      }
    }
    this.updateTable();
  }

  async updateTable(){
    this.workOrders$ = this.workorderserv.getWorkOrders();
    // await this.workorderserv.getWorkOrders().pipe(take(1)).subscribe(workOrders => {
    //   console.log(workOrders)
    //   this.orders = workOrders.sort((a, b) => -a.created.localeCompare(b.created));
    //   this.tableData = new LocalDataSource(this.orders)
    //   this.tableData.setPaging(2,0)
    // })
  }

  async addWorkOrder(){

    const workOrderDialog = await this.dialogService.open(EditWorkOrderComponent)
    const response = await firstValueFrom(workOrderDialog.onClose);
    if(!!response){
      await this.updateTable()
    }
  }


  async selectRow({isSelected, data}: any){
    this.isSelected = isSelected
    if(isSelected){
      this.selectedRow = data;
      const workOrderDialog = await this.dialogService.open(EditWorkOrderComponent, {
        context:{
          selectedWorkOrder: this.selectedRow
        }
      })
      const response = await firstValueFrom(workOrderDialog.onClose);
      if(!!response){
        await this.updateTable()
      }
    }else{
      this.selectedRow = undefined;
    }
  }

}
