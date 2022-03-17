import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { firstValueFrom } from 'rxjs';
import { EditWorkOrderStatusComponent } from '../edit-work-order-status/edit-work-order-status.component';
import { UpdateStockComponent } from '../update-stock/update-stock.component';

@Component({
  selector: 'app-work-order-status',
  templateUrl: './work-order-status.component.html',
  styleUrls: ['./work-order-status.component.scss']
})
export class WorkOrderStatusComponent implements OnInit {
  tableData: LocalDataSource = new LocalDataSource();
  tableSettings: object = {};


  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.tableSettings = {
      actions: false,
      columns:{
        workOrderNumber:{
          title: "Work Order",
          width: '50%',
          filter: false
        },
        workOrderStatus:{
            title: "Progress",
            filter: false
        }
      }
    }
  }

  async selectRow({isSelected, data}: any){
    if(isSelected){
      const workOrderDialog = await this.dialogService.open(EditWorkOrderStatusComponent, {
        context:{
          selectedWorkOrder: data
        }
      })
      const response = await firstValueFrom(workOrderDialog.onClose);
      if(!!response){
        
      }
    }
  }

}
