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
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
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
      this.countBasket = this.basket.length;
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

  menuToggle(): void {
    this.openBurgerMenu = !this.openBurgerMenu;
    this.active = !this.active;

  }
  menuToggleUser(): void {
    this.openBurgerMenuUser = !this.openBurgerMenuUser;

  }

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

}
