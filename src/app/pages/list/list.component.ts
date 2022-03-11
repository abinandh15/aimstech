import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() title: string = ''
  @Input() data!: Observable<any>;
  isSelected: boolean = false;
  @Output() addItem = new EventEmitter();
  @Output() editItem = new EventEmitter();
  @Output() deletItem = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  add() {

  }

  edit() {

  }

  delete() {

  }

}
