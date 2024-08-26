import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  public IMAGE_UPLOAD_URL = `https://garbrix.com/images/uploadImage.php`;

  constructor(private http: HttpClient) {}

  uploadImage(file: any, idImage: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('id_products', idImage);

    const headers = new HttpHeaders({
      Accept: 'multipart/form-data',
    });

    return this.http.post<any>(this.IMAGE_UPLOAD_URL, formData, { headers });
  }
}
