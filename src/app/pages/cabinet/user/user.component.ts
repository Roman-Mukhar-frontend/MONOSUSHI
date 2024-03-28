import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public userDataForm!: FormGroup;
  public openModalWindow = false;


  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.initUserDataForm();

  }

  initUserDataForm(): void {
    this.userDataForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, Validators.required],
      birthdayDate: [null, ],
    });
  }

  saveUserData(): void {

  }

  openModal(): void {
    this.openModalWindow = !this.openModalWindow;

  }

}
