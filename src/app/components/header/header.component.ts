import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public basket: Array<IProductResponse> = [];
  public total = 0;
  public countBasket = 0;
  public usersCategoriesArr: Array<ICategoryResponse> = [];
  public openBurgerMenu = false;
  public active = false;
  public openModal = false;
  public openCallBack = false;
  public openSignIn = false;
  public openRecoveryPassword = false;
  public openSignUp = false;
  public openBasket = false;

  public authForm!: FormGroup;
  public openBurgerMenuUser = false;
  public isLogin = false;
  public isAdmin = false;



  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.getCategories();
    this.updateBasket();
    this.initAuthForm();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login(): void {
    this.accountService.login(this.authForm.value).subscribe(data => {
      if (data && data.length > 0) {
        const user = data[0];
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.accountService.isUserLogin$.next(true);
        if (user && user.role === ROLE.USER) {
          this.router.navigate(['/cabinet']);
        } else if (user && user.role === ROLE.ADMIN) {
          this.router.navigate(['/admin']);
        }
      }
    }, (e) => {
      console.log(e);
    })
    this.authForm.reset()
    this.closeModal();
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

  closeModal(): void {
    this.openModal = false;
    this.openCallBack = false;
    this.openSignIn = false;
    this.openRecoveryPassword = false;
    this.openSignUp = false;
    this.openBasket = false;
  }

  openCallBackFunc(): void {
    this.openModal = true;
    this.openCallBack = true;
  }
  openSignInFunc(): void {
    this.openModal = true;
    this.openSignIn = true;
    this.openRecoveryPassword = false;
    this.openSignUp = false;
  }

  openRecoveryPasswordFunc(): void {
    this.openSignIn = false;
    this.openRecoveryPassword = true;
  }
  openSignUpFunc(): void {
    this.openSignIn = false;
    this.openSignUp = true;
  }
  openBasketFunc(): void {
    this.openBasket = !this.openBasket;
  }
  closeBasketModal(): void {
    this.closeModal();
    this.openBasket = false;
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.getTotalPrice();
  }

}
