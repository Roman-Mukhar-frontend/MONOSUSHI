import { Injectable } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public uploadPercent = 0;

  constructor(
    private storage: Storage

  ) { }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
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


  // deleteUploadFile(): void {
  //   const task = ref(this.storage, this.valueByControl('imagePath'));
  //   deleteObject(task).then(() => {
  //     console.log('File deleted');
  //     this.isUploaded = false;
  //     this.uploadPercent = 0;
  //     this.productForm.patchValue({
  //       imagePath: null
  //     })
  //   })
  // }

  deleteUploadFile(imagePath: string): Promise<void> {
      const task = ref(this.storage, imagePath);
      return deleteObject(task)
  }
}
