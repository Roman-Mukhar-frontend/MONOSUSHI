import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryComponent } from './product-category.component';
import { ProductComponent } from './product/product.component';
import { ProductInfoResolver } from '../../shared/services/product/product-info.resolver';


const routes: Routes = [
  {
    path: '', component: ProductCategoryComponent
  },
  {
    path: ':id', component: ProductComponent,
    resolve: {
      productInfo: ProductInfoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
