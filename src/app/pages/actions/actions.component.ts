import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  public usersDiscounts: Array<IDiscountResponse> = [];

  constructor(
    private actionService: ActionService
  ) { }

  ngOnInit(): void {
    this.loadAllDiscounts();
  }

  loadAllDiscounts(): void {
    this.actionService.getAll().subscribe((data) => {
      this.usersDiscounts = data as IDiscountResponse[];
    });
  }
}
