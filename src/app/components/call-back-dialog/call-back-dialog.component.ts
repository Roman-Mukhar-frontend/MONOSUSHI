import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-call-back-dialog',
  templateUrl: './call-back-dialog.component.html',
  styleUrls: ['./call-back-dialog.component.scss']
})
export class CallBackDialogComponent implements OnInit {

  public callBackForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CallBackDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.initcallBackForm();
  }

  initcallBackForm(): void {
    this.callBackForm = this.fb.group({
      name: [null, [Validators.required, Validators.required]],
      phoneNumber: [null, [Validators.required]]
    })
  }

  callBack(): void {
    
  }

}
