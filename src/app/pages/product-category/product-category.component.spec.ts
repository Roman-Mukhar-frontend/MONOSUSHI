import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryComponent } from './product-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductCategoryComponent', () => {
  let component: ProductCategoryComponent;
  let fixture: ComponentFixture<ProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should add count in productCount', () => {

    const FAKE_PRODUCT_IN_BASKET = {
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
      };
    const product = FAKE_PRODUCT_IN_BASKET;
    const value = true;
    spyOn(component, 'productCount').and.callThrough()
    component.productCount(product, value);
    expect(component.productCount).toHaveBeenCalled();
    expect(product.count).toBe(3);
  });

  it('it should subtract count in productCount', () => {

    const FAKE_PRODUCT_IN_BASKET = {
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
      };
    const product = FAKE_PRODUCT_IN_BASKET;
    const value = false;
    spyOn(component, 'productCount').and.callThrough()
    component.productCount(product, value);
    expect(component.productCount).toHaveBeenCalled();
    expect(product.count).toBe(1);
  });

  it('it should add product to basket', () => {

    const FAKE_PRODUCT_TO_BASKET = {
      category: {
        id: 2, name: 'string', path: 'string', imagePath: 'string',
      },
      name: 'string', path: 'string', ingredients: 'string', weight: 100, price: 10, imagePath:'string', count: 2, id: 1
    };
    const product = FAKE_PRODUCT_TO_BASKET;
    spyOn(component, 'addToBasket').and.callThrough()
    component.addToBasket(product);
    expect(component.addToBasket).toHaveBeenCalled();
    expect(product.count).toBe(1);
  });


});
