import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  public usersProducts: Array<IProductResponse> = [];
  public product!: IProductResponse;


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.usersProducts = data;
      console.log(data);
    });
  }
  getOneProduct(): void {
    const DISCOUNT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getOne(DISCOUNT_ID).subscribe(data => {
      this.product = data;
    })
  }

  countMinFunc(product: IProductResponse): void {
    if (product.count > 1) {
    product.count -= 1;
    }
  }

  countPlusFunc(product: IProductResponse): void {
    product.count += 1;
    
  }



}
