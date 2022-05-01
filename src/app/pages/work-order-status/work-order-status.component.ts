import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { firstValueFrom, map, Observable } from 'rxjs';
import { WorkOrder } from 'src/app/models/work-order';
import { PercentageViewComponent } from 'src/app/percentage-view/percentage-view.component';
import { WorkOrderService } from 'src/app/services/work-order.service';
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
      pager: { display: false },
      columns:{
        workOrderNumber:{
          title: "Work Order",
          width: '50%',
          filter: false,
        },
        workOrderStatus:{
            title: "Progress",
            type: 'custom',
            renderComponent: PercentageViewComponent,
            filter: false,
            sort: true,
            sortDirection: 'asc'
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
