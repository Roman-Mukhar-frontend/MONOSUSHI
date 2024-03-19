import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

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
import { OrderComponent } from './admin/order/order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';


import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ActionsComponent,
    ProductCategoryComponent,
    ProductComponent,
    DostavkaTaOplataComponent,
    AboutUsComponent,
    DogovirOfertaComponent,
    AdminComponent,
    ActionComponent,
    CategoryComponent,
    ActionInfoComponent,
    OrderComponent,
    AdminProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
