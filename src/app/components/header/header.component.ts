import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public usersCategoriesArr: Array<ICategoryResponse> = [];
  public openBurgerMenu = false;
  public active = false;
  public openModal = false;
  public openCallBack = false;
  public openSignIn = false;
  public openRecoveryPassword = false;
  public openSignUp = false;
  public openBasket = false;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories()
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
}
