import { Injectable } from '@angular/core';
import { ICategoryRequest } from '../../interfaces/category/category.interface';
import {Firestore, CollectionReference, addDoc, collectionData, doc, updateDoc, deleteDoc, docData} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAll() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOne(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  createCategory(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }

  updateCategory(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, {...category});
  }

  deleteCategory(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

}
