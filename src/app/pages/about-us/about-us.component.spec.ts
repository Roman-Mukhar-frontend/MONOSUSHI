import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsComponent } from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should change total', () => {
  const FAKE_QUESTIONS = [
      {
        h2: 'Як можна замовити, якщо наша адреса не входить у вашу зону доставки?',
        p1: 'Якщо ваша адреса знаходиться поза межами нашої зони доставки, ви можете:',
        p2: 'Забрати замовлення самовивозом за однією з наших адрес. (В такому випадку ви отримаєте “Запечені моно макі з лососем у подарунок).',
        p3: 'Дізнатись в оператора чи є можливість зробити виключення для доставки поза межі зони в даний момент часу.',
        ask: false,
      },
      {
        h2: 'Скільки часу очікувати на замовлення?',
        p1: 'Час доставки залежить від адреси замовлення.',
        p2: 'Доставка в зелену зону – до 1 год.',
        p3: 'Доставка в жовту зону – до 1,5 год.',
        ask: false,
      },

    ];
    component.questions = FAKE_QUESTIONS;
    const index = 1;
    spyOn(component, 'ask').and.callThrough()
    component.ask(index);
    expect(component.ask).toHaveBeenCalled();
    expect(component.questions[index].ask).toBe(true);
    // component.basket = [];
    // component.getTotalPrice();
    // expect(component.getTotalPrice).toHaveBeenCalled();
    // expect(component.total).toBe(0);
  });

});
