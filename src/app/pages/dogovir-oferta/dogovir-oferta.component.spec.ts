import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogovirOfertaComponent } from './dogovir-oferta.component';

describe('DogovirOfertaComponent', () => {
  let component: DogovirOfertaComponent;
  let fixture: ComponentFixture<DogovirOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogovirOfertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogovirOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
