import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogovirOfertaComponent } from './dogovir-oferta.component';






const routes: Routes = [
  {
    path: '', component: DogovirOfertaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DogovirOfertaRoutingModule { }
