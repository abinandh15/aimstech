import { Component, OnInit } from '@angular/core';
import { WorkOrder } from 'src/app/models/work-order';

@Component({
  selector: 'app-edit-work-order-status',
  templateUrl: './edit-work-order-status.component.html',
  styleUrls: ['./edit-work-order-status.component.scss']
})
export class EditWorkOrderStatusComponent implements OnInit {
  selectedWorkOrder!: WorkOrder;
  constructor() { }

  ngOnInit(): void {
  }

}
