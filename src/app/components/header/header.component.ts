import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { CallBackDialogComponent } from '../call-back-dialog/call-back-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public basket: Array<IProductResponse> = [];
  public total = 0;
  public countBasket = 0;
  public usersCategoriesArr: Array<ICategoryResponse> = [];
  public openBurgerMenu = false;
  public active = false;
  // public openModal = false;
  // public openCallBack = false;
  // public openSignIn = false;
  // public openRecoveryPassword = false;
  // public openSignUp = false;
  public openBasket = false;

  public authForm!: FormGroup;
  public registerForm!: FormGroup;

  public openBurgerMenuUser = false;
  public isLogin = false;
  public isAdmin = false;

  public loginSubscription!: Subscription;



  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.getCategories();
    this.updateBasket();
    // this.initAuthForm();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
    this.initRegisterForm();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  // initAuthForm(): void {
  //   this.authForm = this.fb.group({
  //     email: [null, [Validators.required, Validators.email]],
  //     password: [null, [Validators.required]]
  //   })
  // }

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

    // const { email, password } = this.authForm.value;
    // this.login(email, password).then(() => {
    //   console.log('login done');
    //   this.toastr.success('User successfully login');
    // }).catch(e => {
    //   this.toastr.error(e.message)
    // })
    // this.authForm.reset()
    // this.closeModal();
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
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

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.isAdmin = true;
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.isAdmin = false;
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.isLogin = !this.isLogin;
      this.checkUserLogin();
    })
  }

  logOut(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }


  registerUser(): void {
    const { email, password } = this.registerForm.value;
this.emailSignUp(email, password).then(() => {
  this.toastr.success('User successfully created');
  // this.isLogin = !this.isLogin;
  // this.isAdmin = false;
  this.registerForm.reset();
}).catch(e => {
  this.toastr.error(e.message);
  console.log(e.message);
})
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      adress1: '',
      adress2: '',
      birthDay: '',
      firstName: '',
      lastName: '',
      orders: [],
      phoneNumber: '',
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user)
    // console.log('newUser', credential)
  }






  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.countBasket = this.basket.length;
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, product: IProductResponse) =>
      total + product.count * product.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.usersCategoriesArr = data;
    })
  }

  deleteProduct(product: IProductResponse): void {
    if (this.basket.some((item) => item.id === product.id)) {
      const index = this.basket.findIndex(
        (item) => item.id === product.id
      );
      this.basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }
  }

  menuToggle(): void {
    this.openBurgerMenu = !this.openBurgerMenu;
    this.active = !this.active;

  }
  menuToggleUser(): void {
    this.openBurgerMenuUser = !this.openBurgerMenuUser;

  }

  // closeModal(): void {
  //   this.openModal = false;
  //   this.openCallBack = false;
  //   this.openSignIn = false;
  //   this.openRecoveryPassword = false;
  //   this.openSignUp = false;
  //   this.openBasket = false;
  // }

  // openCallBackFunc(): void {
  //   this.openModal = true;
  //   this.openCallBack = true;
  // }

  openCallBackDialog(): void {
    this.dialog.open(CallBackDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openBasketFunc(): void {
    this.dialog.open(BasketDialogComponent, {
      backdropClass: 'basket-dialog-back', 
      panelClass: 'basket-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }


  // openSignInFunc(): void {
  //   this.openModal = true;
  //   this.openSignIn = true;
  //   this.openRecoveryPassword = false;
  //   this.openSignUp = false;
  // }

  // openRecoveryPasswordFunc(): void {
  //   this.openSignIn = false;
  //   this.openRecoveryPassword = true;
  // }
  // openSignUpFunc(): void {
  //   this.openSignIn = false;
  //   this.openSignUp = true;
  // }
  // openBasketFunc(): void {
  //   this.openBasket = !this.openBasket;
  // }
  // closeBasketModal(): void {
  //   this.closeModal();
  //   this.openBasket = false;
  // }

  // productCount(product: IProductResponse, value: boolean): void {
  //   if (value) {
  //     ++product.count;
  //   } else if (!value && product.count > 1) {
  //     --product.count;
  //   }
  //   this.getTotalPrice();
  // }

}
