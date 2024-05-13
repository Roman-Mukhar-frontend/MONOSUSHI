import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActionService } from './action.service';
import { IDiscountResponse } from '../../interfaces/action/action.interface';


@Injectable({
  providedIn: 'root'
})
export class ActionInfoResolver implements Resolve<IDiscountResponse> {

constructor(private actionService: ActionService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiscountResponse> {
    // @ts-ignore
    return this.actionService.getOne(route.paramMap.get('id'));
  }
}
