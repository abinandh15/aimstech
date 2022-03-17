import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {

  constructor(private dialogRef: NbDialogRef<AlertBoxComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(message: String){
    this.dialogRef.close(message)
  }

}
