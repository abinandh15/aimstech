import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { WorkOrder } from 'src/app/models/work-order';
import { WorkOrderService } from 'src/app/services/work-order.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { RowInput, UserOptions } from 'jspdf-autotable';
interface jsPDFWithPlugin extends jsPDF {
  [x: string]: any;
  autoTable: (options: UserOptions) => jsPDF;
}
@Component({
  selector: 'app-work-order-table',
  templateUrl: './work-order-table.component.html',
  styleUrls: ['./work-order-table.component.scss']
})
export class WorkOrderTableComponent implements OnInit, OnDestroy {
  @Input() workOrders$!: Observable<WorkOrder[]>
  @Input() showAddButton: boolean = false;
  @Input() showPrintButton: boolean = false;
  @Input() tableSettings = {}
  @Output() rowSelected = new EventEmitter();
  @Output() addWorkOrder = new EventEmitter();
  @Output() printWorkOrders = new EventEmitter();
  @Input() title: string = 'Work Orders'
  @Input() filterBy: string = 'created';
  accordionData: any = []
  protected subscription!: Subscription;
  constructor(protected workOrderService: WorkOrderService) { }

  ngOnInit(): void {
    this.getAccordianData();
  }

  async getAccordianData() {
    this.subscription = await this.workOrderService.getWorkOrders(this.filterBy).pipe(map(workorders=>{

      this.accordionData = [];
      let prevMonth = new Date(workorders[0].created).getMonth();
      let iterator = 0;
      workorders.forEach(workorder => {
        const date = new Date(workorder.created);
        const month = date.getMonth();
        const monthString = date.toLocaleString('default', { month: 'long' });
        if (this.accordionData.length === 0) {
          this.accordionData.push({
            month,
            monthString,
            workOrders: [
              workorder
            ]
          })
        } else {

          if (month !== prevMonth) {
            prevMonth = month;
            iterator = iterator + 1;
            this.accordionData.push({
              month,
              monthString,
              workOrders: [
                workorder
              ]
            })
          } else {
            this.accordionData[iterator].workOrders.push(workorder)
          }
        }
      })
    })).subscribe()
  }

  selectRow({ isSelected, data }: any) {
    this.rowSelected.emit({ isSelected, data })
  }

  add() {
    this.addWorkOrder.emit()
  }

  print(){
    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    let year = 0
    this.accordionData.forEach((month:{monthString:string, workOrders: WorkOrder[]},index:number) =>{
    let data: RowInput[] = []
   
    const date = new Date(month.workOrders[0].created);
    year = date.getFullYear();
    const filteredWorkorders = month.workOrders.filter(workOrder => workOrder.status == "Pending")
    if(filteredWorkorders.length > 0){
    month.workOrders.forEach((el:WorkOrder)=>{
        if(el.status == "Pending"){
          el.items.forEach(item=>{
            data.push([el.workOrderNumber.toString(),item.itemName , item.quantity.toString(), el.status? el.status.toString() : 'Pending']) 
          })
        }
      })
      doc.text(month.monthString, 30, 20)

      doc.autoTable({
        head: [['WorkOrder','Item Name', 'Quantity', 'Status']],
        body: data
      })
      if(index != this.accordionData.length - 1){
        doc.addPage()
      }
    }

    })
    
    doc.save('WorkOrder' + Date.now().toString() + year)
  }

  ngOnDestroy(): void {
    if(!!this.subscription){

    this.subscription.unsubscribe()
  }
  }
}
