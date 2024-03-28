import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public passForm!: FormGroup;


  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initPassForm();
  }

  initPassForm(): void {
    this.passForm = this.fb.group({
      currentPass: [null, Validators.required],
      newPass: [null, Validators.required],
      newPassRepeat: [null, Validators.required],

    });

  }


  savePass(): void {

  }

}
