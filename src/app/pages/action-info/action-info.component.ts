import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent implements OnInit {

  public discount!: IDiscountResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private actionService: ActionService
  ) { }

  ngOnInit(): void {
    this.getOneDiscount();
  }


  getOneDiscount(): void {
    const DISCOUNT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.actionService.getOne(DISCOUNT_ID).subscribe(data => {
      this.discount = data;
    })
  }
}
