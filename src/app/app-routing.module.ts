import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component'
import { ActionsComponent } from './pages/actions/actions.component';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { ProductComponent } from './pages/product/product.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DogovirOfertaComponent } from './pages/dogovir-oferta/dogovir-oferta.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { UserComponent } from './pages/cabinet/user/user.component';
import { OrderHistoryComponent } from './pages/cabinet/order-history/order-history.component';
import { ChangePasswordComponent } from './pages/cabinet/change-password/change-password.component';


import { AdminComponent } from './admin/admin.component';
import { ActionComponent } from './admin/action/action.component';
import { CategoryComponent } from './admin/category/category.component';
import { OrderComponent } from './admin/order/order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { ActionInfoResolver } from './shared/services/action/action-info.resolver';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AuthorizationComponent } from './pages/authorization/authorization.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '' },
  { path: 'actions', component: ActionsComponent },
  {
    path: 'action/:id', component: ActionInfoComponent, resolve: {
      actionInfo: ActionInfoResolver
    }
  },
  { path: 'product-category/:category', component: ProductCategoryComponent },
  {
    path: 'product/:id', component: ProductComponent, resolve: {
      productInfo: ProductInfoResolver
    }
  },
  { path: 'dostavka-ta-oplata', component: DostavkaTaOplataComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'dogovir-oferta', component: DogovirOfertaComponent },
  { path: 'cabinet', component: CabinetComponent, canActivate: [AuthGuard], children: [
    { path: 'user', component: UserComponent },
    { path: '', pathMatch: 'full', redirectTo: 'user' },
    { path: 'order-history', component: OrderHistoryComponent },
    { path: 'change-password', component: ChangePasswordComponent },
  ] },

  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: 'action', component: ActionComponent },
      { path: 'category', component: CategoryComponent },
      { path: '', pathMatch: 'full', redirectTo: 'action' },
      { path: 'product', component: AdminProductComponent },
      { path: 'order', component: OrderComponent },

    ]
  },{ path: 'auth', component: AuthorizationComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
