import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { firstValueFrom } from 'rxjs';
import { AlertBoxComponent } from 'src/app/alert-box/alert-box.component';
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
  tableData: LocalDataSource = new LocalDataSource()
  tableSettings: Object = {}
  itemForm!: FormGroup;
  selectedItem!: Item;
  showForm: boolean = false;

  constructor(protected dialogRef: NbDialogRef<UpdateStockComponent>, private fb: FormBuilder, private workOrderServ: WorkOrderService, private dialogServ: NbDialogService) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: [0, Validators.required],
      partNumber: ['', Validators.required]
    })

    this.tableSettings = {   
      actions: {
          add: false,
          edit: false,
          delete: true,
          position: 'right'
      },
      hideSubHeader: true,
      delete: {
        deleteButtonContent: `<img src="assets/nb-trash.svg" width="40" height="40">`,
        confirmDelete: true
      },

      pager: { display: false },
      sort: false,
      columns: {
        itemName: {
          title: "Item Name",
          width: "50%",
          filter: false
        },
        quantity: {
          title: "Quantity",
          filter: false,
          type: 'custom',
          valuePrepareFunction: (value: any, row: any, cell: any) => {
            return { workOrderQuantity: this.selectedWorkOrder.quantity, ...row }
          },
          renderComponent: QuantityDisplayComponent
        }
      }
    }

    if (!!this.selectedWorkOrder.items) {
      this.tableData = new LocalDataSource(this.selectedWorkOrder.items)
    }
  }

  async onDeleteConfirm(event: any){
    console.log(event)
    const dialog = this.dialogServ.open(AlertBoxComponent)
    const response = await firstValueFrom(dialog.onClose);
    if(!!response){
      if(response === "YES"){
        this.tableData.remove(event.data);
        const data = {
          ...this.selectedWorkOrder,
          items: [
            ...this.selectedWorkOrder.items.filter(item=> item.itemName.toLowerCase() !== event.data.itemName.toLowerCase())
          ]
        }

        this.workOrderServ.updateWorkOrder(data).then(res => {
          this.selectedWorkOrder.items = data.items;
        }).catch(err => { console.log(err) })
        
      }
    }
  }

  closeDialog(data: any) {
    this.dialogRef.close(data)
  }

  async saveItem() {
    let data: WorkOrder;
    if (this.selectedWorkOrder.items.length > 0) {
      data = {
        ...this.selectedWorkOrder,
        items: [
          ...this.selectedWorkOrder.items.map(item => {
            if (item.itemName === this.itemForm.value.itemName) {
              return this.itemForm.value
            } else {
              return item
            }
          }),

        ]
      }

    } else {
      data = {
        ...this.selectedWorkOrder,
        items: [
          { ...this.itemForm.value }
        ]
      }
    }
    let pending = true;
    for(let i=0; i< data.items.length; i++){
      if(data.items[i].quantity == 0){
        pending = false
        break;
      }
    }
    console.log(data)
    data.status = pending ? 'Pending' : 'Completed';
    this.workOrderServ.updateWorkOrder(data).then(res => {
      console.log(res)
      this.selectedWorkOrder.items = data.items;
      this.tableData = new LocalDataSource(this.selectedWorkOrder.items)
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

  addItem() {
    this.showForm = !this.showForm;
    this.itemForm.reset()
  }

  async selectedRow({ isSelected, data }: any) {
    if (isSelected) {
      this.selectedItem = data;
      this.showForm = !this.showForm;
      this.itemForm.patchValue(this.selectedItem)
    }
  }

}
