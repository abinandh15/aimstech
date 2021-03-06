import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { CHASE_TYPE, Item, ProgressStatus, WorkOrder } from 'src/app/models/work-order';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-edit-work-order',
  templateUrl: './edit-work-order.component.html',
  styleUrls: ['./edit-work-order.component.scss']
})
export class EditWorkOrderComponent implements OnInit {
  workOrdersForm!: FormGroup;
  showForm: boolean = true;
  selectedWorkOrder!: WorkOrder;
  chaseTypeEnum = [
    { name: "INWIN", value: "INWIN" },
    { name: "AIO", value: "AIO" },
    { name: "SLIM", value: "SLIM" }
  ]
  progress :ProgressStatus ={
    stockReceived: 0,
    assembling: 0,
    burnIn: 0,
    fqc: 0,
    packing: 0
  }
  items: Item[] = []
  constructor(public fb: FormBuilder, private dialogRef: NbDialogRef<EditWorkOrderComponent>, private workOrderServ: WorkOrderService) { }

  ngOnInit(): void {
    this.workOrdersForm = this.fb.group({
      workOrderNumber: [Number, Validators.required],
      quantity: [Number, Validators.required],
      customerName: ['', Validators.required],
      partNumber: ['', Validators.required],
      chaseType: [CHASE_TYPE, Validators.required]
    })
    if (!!this.selectedWorkOrder) {
      this.showForm = false;
      this.workOrdersForm.patchValue({ ...this.selectedWorkOrder })
    }
  }

  closeDialog(data: any) {
    this.dialogRef.close(data)
  }

  saveWorkOrder() {
    // Update existing Work order
    if (this.selectedWorkOrder) {
      const data: WorkOrder = {
        id: this.selectedWorkOrder.id,
        modified: new Date().toISOString(),        
        ...this.workOrdersForm.value,
      }

      this.workOrderServ.updateWorkOrder(data).then(res => {

        this.closeDialog(data);

      }).catch(err => { console.log(err) })
      // Add new Work order
    } else {
      const data: WorkOrder = {
        created: new Date().toISOString(),
        items: this.items,
        progress: this.progress,
        workOrderStatus: 0,
        ...this.workOrdersForm.value,
        status: 'Pending'
      }
      this.workOrderServ.addWorkOrder(data).then(res => {
        if (!!res) {
          this.closeDialog(res);
        }
      }).catch(err => { console.log(err) })
    }


  }


}
