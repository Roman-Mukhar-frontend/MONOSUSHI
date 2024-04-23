import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogovirOfertaComponent } from './dogovir-oferta.component';
import { DogovirOfertaRoutingModule } from './dogovir-oferta-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    DogovirOfertaComponent
  ],
  imports: [
    CommonModule,
    DogovirOfertaRoutingModule,
    SharedModule
  ]
})
export class DogovirOfertaModule { }
