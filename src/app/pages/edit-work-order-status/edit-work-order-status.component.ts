import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { WorkOrder } from 'src/app/models/work-order';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-edit-work-order-status',
  templateUrl: './edit-work-order-status.component.html',
  styleUrls: ['./edit-work-order-status.component.scss']
})
export class EditWorkOrderStatusComponent implements OnInit {
  selectedWorkOrder!: WorkOrder;
  statusForm!: FormGroup;
  showForm: Boolean = false;
  constructor(public fb: FormBuilder, private workOrderService: WorkOrderService,protected dialogRef: NbDialogRef<EditWorkOrderStatusComponent>) { }

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      stockReceived: [0],
      assembling: [0],
      burnIn: [0],
      fqc: [0],
      packing: [0]
    })


    this.statusForm.patchValue(this.selectedWorkOrder.progress)
  }

  closeDialog(){
    this.dialogRef.close()
  }

  async updateStatus() {
    const data = {
      ...this.selectedWorkOrder,
      progress: this.statusForm.value
    }
    let sum = 0;
    for(let key in data.progress){
      sum += data.progress[key];
    }

    data.workOrderStatus = `${Math.round((sum/(+data.quantity*5)) * 100)}%`;
    
    await this.workOrderService.updateWorkOrder(data).then(res => {
      this.showForm = !this.showForm;
      this.selectedWorkOrder.progress =  this.statusForm.value;
    })
  }

}
