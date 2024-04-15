import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss']
})
export class BasketDialogComponent implements OnInit {

  public basket: Array<IProductResponse> = [];
  public total = 0;
  public countBasket = 0;

  constructor(
    private orderService: OrderService,

  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    // this.getTotalPrice();
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

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
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

}
