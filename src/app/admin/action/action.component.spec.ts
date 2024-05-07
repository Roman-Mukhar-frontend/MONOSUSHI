import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionComponent } from './action.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Storage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";

describe('ActionComponent', () => {
  let component: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should save discount', () => {

    spyOn(component, 'saveDiscount').and.callThrough()
    component.saveDiscount();
    expect(component.saveDiscount).toHaveBeenCalled();
    expect(component.isUploaded).toBe(false);
  });

  it('it should edit discount', () => {
    const FAKE_DISCOUNT =     {
      "name": "РОЛ ТИЖНЯ",
      "title": "50% знижки на \"Рол тижня\"",
      "description": "QQQ",
      "imagePath": "",
      "date": "2024-03-14T11:24:41.408Z",
      "id": 1
    }
    const discount = FAKE_DISCOUNT;
    spyOn(component, 'editDiscount').and.callThrough()
    component.editDiscount(discount);
    expect(component.editDiscount).toHaveBeenCalled();
    expect(component.addNewDiscount).toBe(false);
  });

});
