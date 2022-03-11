import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { firstValueFrom } from 'rxjs';
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
        quantity:{
          title: "Quantity",
          filter: false
        }
      }
    }
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
        
      }
    }
  }

}
