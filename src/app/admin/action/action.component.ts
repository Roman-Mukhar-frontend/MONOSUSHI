import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/shared/services/image/image.service';


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
  private currentDiscountId!: string;

  constructor(
    private fb: FormBuilder,
    private actionService: ActionService,
    private imageService: ImageService,
    private toastr: ToastrService

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
      this.adminDiscounts = data as IDiscountResponse[];
    })
  }

  changeStatusForAddNewDiscount(): void {
    this.addNewDiscount = !this.addNewDiscount;
  }

  saveDiscount(): void {
    if (this.editStatus) {
      this.actionService
        .updateDiscount(this.discountForm.value, this.currentDiscountId)
        .then(() => {
          this.loadCategories();
          this.toastr.success('Discount successfully updated');

        });
    } else {
      this.actionService.createDiscount(this.discountForm.value).then(() => {
        this.loadCategories();
        this.toastr.success('Discount successfully created');

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
    if (confirm(`Do you want to delete discount ${discount.name}`)) {
      this.actionService.deleteDiscount(discount.id).then(() => {
        this.loadCategories();
        this.toastr.success('Discount successfully deleted');

      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('discount-images', file.name, file)
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

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath')).then(() => {
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
