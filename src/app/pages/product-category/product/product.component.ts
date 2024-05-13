import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import {IDiscountResponse} from "../../../shared/interfaces/action/action.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public currentProduct: IProductResponse =     {
    "category": {
      "name": "",
      "path": "",
      "imagePath": "",
      "id": "qqq"
    },
    "name": "",
    "path": "",
    "ingredients": "",
    "weight": 0,
    "price": 0,
    "imagePath": "",
    "count":0,
    "id": "id"
  };
  // public  currentProduct!: IProductResponse;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadProduct();

  }

  loadProduct(): void {
    const DISCOUNT_ID = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.productService.getOne(DISCOUNT_ID).subscribe(data => {
      this.currentProduct = data as IProductResponse;
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);

  }

}
