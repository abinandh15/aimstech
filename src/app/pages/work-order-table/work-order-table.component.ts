import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { WorkOrder } from 'src/app/models/work-order';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-work-order-table',
  templateUrl: './work-order-table.component.html',
  styleUrls: ['./work-order-table.component.scss']
})
export class WorkOrderTableComponent implements OnInit, OnDestroy {
  @Input() workOrders$!: Observable<WorkOrder[]>
  @Input() showAddButton: boolean = false;
  @Input() tableSettings = {}
  @Output() rowSelected = new EventEmitter();
  @Input() title: string = 'Work Orders'
  accordionData: any = []
  protected subscription!: Subscription;
  constructor(protected workOrderService: WorkOrderService) { }

  ngOnInit(): void {
    console.log('hi')
    this.getAccordianData();
  }

  async getAccordianData() {
    console.log('hii')
    this.subscription = await this.workOrderService.getWorkOrders().pipe(map(workorders=>{
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
      console.log(this.accordionData)
    })).subscribe()
  }

  selectRow({ isSelected, data }: any) {
    this.rowSelected.emit({ isSelected, data })
  }

  addWorkOrder() {

  }

  ngOnDestroy(): void {
    if(!!this.subscription){

    this.subscription.unsubscribe()
  }
  }
}
