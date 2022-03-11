import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Item, WorkOrder } from 'src/app/models/work-order';
import { WorkOrderService } from 'src/app/services/work-order.service';
import { QuantityDisplayComponent } from '../quantity-display/quantity-display.component';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {
  selectedWorkOrder!: WorkOrder;
  items!: Item[];
  tableData:LocalDataSource = new LocalDataSource()
  tableSettings: Object ={}
  itemForm!: FormGroup;
  selectedItem!: Item;
  showForm: boolean = false;

  constructor(protected dialogRef: NbDialogRef<UpdateStockComponent>, private fb: FormBuilder, private workOrderServ: WorkOrderService) { }

  ngOnInit(): void {
    console.log(this.selectedWorkOrder)
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: [0, Validators.required],
      partNumber: ['', Validators.required]
    })

    this.tableSettings = {
      actions: false,
      columns:{
        itemName: {
          title: "Item Name",
          width: "50%",
          filter: false
        },
        quantity: {
          title: "Quantity",
          filter: false,          
          type: 'custom',
          valuePrepareFunction:(value: any,row: any,cell: any)=>{
            return {workOrderQuantity: this.selectedWorkOrder.quantity,...row}
          },
          renderComponent: QuantityDisplayComponent
        }
      }
    }
    
    if(!!this.selectedWorkOrder.items){
      this.tableData = new LocalDataSource(this.selectedWorkOrder.items)
    }
  }

  closeDialog(data: any) {
    this.dialogRef.close(data)
  }

  async saveItem(){
    let data: WorkOrder;
    if(!!this.selectedWorkOrder.items){
        data = {
          ...this.selectedWorkOrder,
          items: [
            ...this.selectedWorkOrder.items.filter(item=> item.itemName !== this.itemForm.value.itemName),
            this.itemForm.value
          ]
        }  
 
    }else{
        data = {
          ...this.selectedWorkOrder,
          items: [
            {...this.itemForm.value}
          ]
        }  
    }
    this.workOrderServ.updateWorkOrder(data).then(res => {
   
       this.showForm = !this.showForm;

    }).catch(err => { console.log(err) })
    // const data: WorkOrder = {
    //   ...this.selectedWorkOrder,
    //   items: [
    //     ...this.selectedWorkOrder.items,
    //     ...this.itemForm.value
    //   ]
    // }

  }

  addItem(){
    this.showForm = !this.showForm;
    this.itemForm.reset()
  }

  async selectedRow({isSelected, data}: any){
    if(isSelected){
      this.selectedItem = data;
      this.showForm = !this.showForm;
      this.itemForm.patchValue(this.selectedItem)
    }    
  }

}
