import { Component, OnInit } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  public authForm!: FormGroup;
  public registerForm!: FormGroup;
  public authModal = true;
  public registerModal = false;
  public passModal = false;


  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,


  ) { }

  ngOnInit(): void {
    this.initRegisterForm();
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      repeatPassword: [null, [Validators.required]]
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      console.log('login done');
      this.toastr.success('User successfully login');
    }).catch(e => {
      this.toastr.error(e.message)
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user.role === ROLE.USER) {
        this.router.navigate(['/cabinet']);
      } else if (user && user.role === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const { email, password, firstName, lastName, phoneNumber } = this.registerForm.value;
    this.emailSignUp(email, password, firstName, lastName, phoneNumber).then(() => {
      this.toastr.success('User successfully created');
      this.registerForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
      console.log(e.message);
    })
  }

  async emailSignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      adress1: '',
      adress2: '',
      birthDay: '',
      firstName: firstName,
      lastName: lastName,
      orders: [],
      phoneNumber: phoneNumber,
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user)
  }

  renewPass(): void {
    this.authModal = false;
    this.passModal = true;
  }

  register(): void {
    this.authModal = false;
    this.registerModal = true;
  }

  backToMain(): void {
    this.passModal = false;
    this.registerModal = false;
    this.authModal = true;
  }

}
