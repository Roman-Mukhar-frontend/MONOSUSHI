import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketDialogComponent } from './basket-dialog.component';

describe('BasketDialogComponent', () => {
  let component: BasketDialogComponent;
  let fixture: ComponentFixture<BasketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketDialogComponent);
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

  it('it should add count in productCount', () => {

    const FAKE_PRODUCT_IN_BASKET =
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

      const product = FAKE_PRODUCT_IN_BASKET;
    const value = true;

    spyOn(component, 'productCount').and.callThrough()
    component.productCount(product, value);
    expect(component.productCount).toHaveBeenCalled();
    expect(product.count).toBe(3);
  });

  it('it should subtract count in productCount', () => {

    const FAKE_PRODUCT_IN_BASKET =
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

    const product = FAKE_PRODUCT_IN_BASKET;
    const value = false;

    spyOn(component, 'productCount').and.callThrough()
    component.productCount(product, value);
    expect(component.productCount).toHaveBeenCalled();
    expect(product.count).toBe(1);
  });

});
