import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quantity-display',
  template: `<p>{{rowData.quantity}} / {{value.workOrderQuantity}}</p>`,
  styleUrls: ['./quantity-display.component.scss']
})
export class QuantityDisplayComponent implements OnInit {
  @Input() value: any;
  @Input() rowData: any;
  constructor() { }

  ngOnInit(): void {
  }

}
