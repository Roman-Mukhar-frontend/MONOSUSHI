import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import {ToastrService} from "ngx-toastr";

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryComponent ],
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
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should save category', () => {
    spyOn(component, 'saveCategory').and.callThrough()
    component.saveCategory();
    expect(component.saveCategory).toHaveBeenCalled();
    expect(component.isUploaded).toBe(false);
  });

  it('it should edit category', () => {
    const FAKE_CATEGORY =   {
        "name": "роли",
        "path": "roli",
        "imagePath": "imagePath",
        "id": 1
      };
    const category = FAKE_CATEGORY;
    spyOn(component, 'editCategory').and.callThrough()
    component.editCategory(category);
    expect(component.editCategory).toHaveBeenCalled();
    expect(component.addNewCategory).toBe(false);
  });
});
