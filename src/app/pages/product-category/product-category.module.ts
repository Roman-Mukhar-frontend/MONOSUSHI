import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { ProductComponent } from './product/product.component';
import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ProductCategoryComponent,
    ProductComponent
  ],
  exports: [
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    SharedModule
  ]
})
export class ProductCategoryModule { }
