import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/shared/services/image/image.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public addNewCategory = true;
  public adminCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId = 0;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories()
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  }

  changeStatusForAddNewCategory(): void {
    this.addNewCategory = !this.addNewCategory;
  }

  saveCategory(): void {
    if (this.editStatus) {
      this.categoryService
        .updateCategory(this.categoryForm.value, this.currentCategoryId)
        .subscribe(() => {
          this.loadCategories();
          this.toastr.success('Category successfully updated');

        });
    } else {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(() => {
        this.loadCategories();
        this.toastr.success('Category successfully created');

      });
    }
    this.isUploaded = false;
    this.editStatus = false;
    this.addNewCategory = true;
    this.categoryForm.reset();
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    });
    this.editStatus = true;
    this.currentCategoryId = category.id;
    this.isUploaded = true;
    this.addNewCategory = false;
  }

  deleteCategory(category: ICategoryResponse): void {
    if (confirm(`Do you want to delete category ${category.name}`)) {
      this.categoryService.deleteCategory(category.id).subscribe(() => {
        this.loadCategories();
        this.toastr.success('Category successfully deleted');

      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('category-images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.categoryForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

}
