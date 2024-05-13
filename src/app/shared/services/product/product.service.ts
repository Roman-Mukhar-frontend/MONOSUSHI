import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
  query,
  where,
  getDocs
} from "@angular/fire/firestore";
import {collection, DocumentData} from "@firebase/firestore";
import {IDiscountRequest} from "../../interfaces/action/action.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.productCollection = collection(this.afs, 'products');
  }

  getAll() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  async getAllByCategory(name: string) {
    if( !name ) {name = 'roli'};

    const arr: DocumentData[] = [];
    const category = query(
      this.productCollection,
      where('category.path', '==', `${name}`)
    );
    const querySnapshot = await getDocs(category);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  }

  getOne(id: string) {
    // const productDocumentReference = doc(this.afs, `products/${id}`);
    // return docData(productDocumentReference, { idField: 'id' });
    return docData(doc(this.afs, `products/${id}`), { idField: 'id' });

  }

  createProduct(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateProduct(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, {...product});
  }

  deleteProduct(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }
}
