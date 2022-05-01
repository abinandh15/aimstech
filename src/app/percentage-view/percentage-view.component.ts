import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-percentage-view',
  templateUrl: './percentage-view.component.html',
  styleUrls: ['./percentage-view.component.scss']
})
export class PercentageViewComponent implements ViewCell, OnInit {
  renderValue: string = "";
  @Input() value!: string | number;
  @Input() rowData: any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
