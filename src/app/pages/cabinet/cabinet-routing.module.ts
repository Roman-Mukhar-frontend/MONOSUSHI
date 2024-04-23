import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { UserComponent } from './user/user.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';




const routes: Routes = [
  {
    path: '', component: CabinetComponent, children: [
      { path: 'user', component: UserComponent },
      { path: '', pathMatch: 'full', redirectTo: 'user' },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
