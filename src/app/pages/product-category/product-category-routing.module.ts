import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryComponent } from './product-category.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  {
    path: '', component: ProductCategoryComponent
  },
  {
    path: ':id', component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
