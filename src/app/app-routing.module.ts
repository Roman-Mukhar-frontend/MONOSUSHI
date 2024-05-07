import { NgModule } from '@angular/core';
import {PreloadAllModules, PreloadingStrategy, RouterModule, Routes} from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
// import { ActionInfoResolver } from './shared/services/action/action-info.resolver';
import { AuthGuard } from './shared/guards/auth/auth.guard';



const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },

  { path: 'product/:category',
    loadChildren: () => import('./pages/product-category/product-category.module').then(m => m.ProductCategoryModule)
  },

  { path: 'actions',
    loadChildren: () => import('./pages/actions/actions.module').then(m => m.ActionsModule)
  },

  { path: 'dostavka-ta-oplata',
    loadChildren: () => import('./pages/dostavka-ta-oplata/dostavka-ta-oplata.module').then(m => m.DostavkaTaOplataModule)
  },

  { path: 'dogovir-oferta',
    loadChildren: () => import('./pages/dogovir-oferta/dogovir-oferta.module').then(m => m.DogovirOfertaModule)
  },

  { path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },

  {
    path: 'cabinet',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  { path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
