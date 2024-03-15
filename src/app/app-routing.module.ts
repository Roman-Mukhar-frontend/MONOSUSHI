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

import { AdminComponent } from './admin/admin.component';
import { ActionComponent } from './admin/action/action.component';
import { CategoryComponent } from './admin/category/category.component';
import { CategoryService } from './shared/services/category/category.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '' },
  { path: 'actions', component: ActionsComponent },
  { path: 'action/:id', component: ActionInfoComponent },
  { path: 'product-category/:category', component: ProductCategoryComponent },
  { path: 'dostavka-ta-oplata', component: DostavkaTaOplataComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'dogovir-oferta', component: DogovirOfertaComponent },
  { path: 'admin', component: AdminComponent, children: [
  { path: 'action', component: ActionComponent },
  { path: 'category', component: CategoryComponent },
  // { path: '', pathMatch: 'full', redirectTo: 'action' },
  ] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
