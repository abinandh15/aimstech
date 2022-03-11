import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkOrder } from 'src/app/models/work-order';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.scss']
})
export class WorkOrderDetailsComponent implements OnInit {
  workOrders!: Observable<WorkOrder[]>;
  constructor(public workOrderService: WorkOrderService) { }

  ngOnInit(): void {
    this.workOrders = this.workOrderService.getWorkOrders();
  }

}
