import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
// import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import {ToastrService} from "ngx-toastr";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should change total', () => {
    const FAKE_BASKET = [
      {
        category: {
          id: 2,
          name: 'string',
          path: 'string',
          imagePath: 'string',
        },
        name: 'string',
        path: 'string',
        ingredients: 'string',
        weight: 100,
        price: 10,
        imagePath:'string',
        count: 2,
        id: 1
      }
    ]
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough()
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });


  it('it should change openBurgerMenu', () => {
    component.openBurgerMenu = true;
    spyOn(component, 'menuToggle').and.callThrough()
    component.menuToggle();
    expect(component.menuToggle).toHaveBeenCalled();
    expect(component.openBurgerMenu).toBe(false);
  });

  it('it should change openBurgerMenuUser', () => {
    component.openBurgerMenuUser = true;
    spyOn(component, 'menuToggleUser').and.callThrough()
    component.menuToggleUser();
    expect(component.menuToggleUser).toHaveBeenCalled();
    expect(component.openBurgerMenuUser).toBe(false);
  });









});



