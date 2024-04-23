import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ActionComponent } from './action/action.component';
import { CategoryComponent } from './category/category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    AdminComponent,
    ActionComponent,
    CategoryComponent,
    AdminProductComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
