import { Injectable } from '@angular/core';
import { IDiscountRequest } from '../../interfaces/action/action.interface';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private discountCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.discountCollection = collection(this.afs, 'discounts');
  }

  getAll() {
    return collectionData(this.discountCollection, { idField: 'id' });
  }

  getOne(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return docData(discountDocumentReference, { idField: 'id' });
  }

  createDiscount(discount: IDiscountRequest) {
    return addDoc(this.discountCollection, discount);
  }

  updateDiscount(discount: IDiscountRequest, id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(discountDocumentReference, {...discount});
  }

  deleteDiscount(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(discountDocumentReference);
  }
}
