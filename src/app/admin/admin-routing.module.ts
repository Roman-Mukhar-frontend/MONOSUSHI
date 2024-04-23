import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ActionComponent } from './action/action.component';
import { CategoryComponent } from './category/category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { OrderComponent } from './order/order.component';



const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'action', component: ActionComponent },
      { path: 'category', component: CategoryComponent },
      { path: '', pathMatch: 'full', redirectTo: 'action' },
      { path: 'product', component: AdminProductComponent },
      { path: 'order', component: OrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
