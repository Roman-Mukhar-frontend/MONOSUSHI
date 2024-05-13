import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';
import {findIndex} from "rxjs/operators";
import {IDiscountResponse} from "../../shared/interfaces/action/action.interface";


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public addNewProduct = true;
  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentProductId!: string;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProducts()
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategories = data as ICategoryResponse[];
      this.productForm.patchValue({
        category: this.adminCategories[0].id,
      });
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data as IProductResponse[];
    })
  }

  changeStatusForAddNewProduct(): void {
    this.addNewProduct = !this.addNewProduct;
  }
  saveProduct(): void {
    if (this.editStatus) {
      this.productService
        .updateProduct(this.productForm.value, this.currentProductId)
        .then(() => {
          this.loadProducts();
          this.toastr.success('Product successfully updated');
        });
    } else {
      this.productService.createProduct(this.productForm.value).then(() => {
        this.loadProducts();
        this.toastr.success('Product successfully created');
      });
    }
    this.isUploaded = false;
    this.editStatus = false;
    this.addNewProduct = true;
    this.productForm.reset();

  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
      // count: 1
    });
    this.editStatus = true;
    this.currentProductId = product.id;
    this.isUploaded = true;
    this.addNewProduct = false;
  }

  deleteProduct(product: IProductResponse) {
    if (confirm(`Do you want to delete product ${product.name}`)) {
      this.productService.deleteProduct(product.id).then(() => {
        this.loadProducts();
        this.toastr.success('Product successfully deleted');

      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('product-images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
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
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }


  protected readonly findIndex = findIndex;
}
