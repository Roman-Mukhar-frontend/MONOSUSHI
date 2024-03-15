import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/action/action.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ActionService } from 'src/app/shared/services/action/action.service';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  
  public addNewDiscount = true;
  public adminDiscounts: Array<IDiscountResponse> = [];
  public discountForm!: FormGroup;
  public editStatus = false;
  public isUploaded = false;
  private currentDiscountId = 0;

  constructor(
    private fb: FormBuilder,
    private actionService: ActionService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadCategories()
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
      date: [new Date()]
    });
  }

  loadCategories(): void {
    this.actionService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    })
  }

  changeStatusForAddNewDiscount(): void {
    this.addNewDiscount = !this.addNewDiscount;
  }
  saveDiscount(): void {
    if (this.editStatus) {
      this.actionService
        .updateDiscount(this.discountForm.value, this.currentDiscountId)
        .subscribe(() => {
          this.loadCategories();
        });
    } else {
      this.actionService.createDiscount(this.discountForm.value).subscribe(() => {
        this.loadCategories();
      });
    }
    this.isUploaded = false;
    this.editStatus = false;
    this.addNewDiscount = true;
    this.discountForm.reset();
    this.discountForm.patchValue({ date: new Date() });
  }

  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
      date: new Date()
    });
    this.editStatus = true;
    this.currentDiscountId = discount.id;
    this.isUploaded = true;
    this.addNewDiscount = false;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.actionService.deleteDiscount(discount.id).subscribe(() => {
      this.loadCategories();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('discount-images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if(file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.discountForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
}
