import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DostavkaTaOplataComponent } from './dostavka-ta-oplata.component';




const routes: Routes = [
  {
    path: '', component: DostavkaTaOplataComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DostavkaTaOplataRoutingModule { }
