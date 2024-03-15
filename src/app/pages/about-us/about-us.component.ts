import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  
  public questions = [
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
    {
      h2: 'Доставка безкоштовна?',
      p1: 'Так, доставка безкоштовна при мінімальній сумі замовлення 300 грн в зелену зону доставки та 400 грн в жовту зону.',
      p2: '',
      p3: '',
      ask: false,
    },
    {
      h2: 'До якої години ви приймаєте замовлення?',
      p1: 'Ми приймаємо замовлення кожного дня з 11:00 по 22:30 ( у зв’язку з комендантською годиною )',
      p2: '',
      p3: '',
      ask: false,
    },
  ];

  constructor() { }
  

  ngOnInit(): void {
  }

  ask(index: number): void {
    this.questions[index].ask = !this.questions[index].ask;
  }
}
