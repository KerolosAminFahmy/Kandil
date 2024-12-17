import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinishCategoryDTO } from '../Models/model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinishCategoryService {
  private readonly apiUrl = environment.apiUrl+"/FinishCategory";
  // private FinishCategorySubject = new BehaviorSubject<FinishCategoryDTO[]>([]);
  // public FinishCategory$ = this.FinishCategorySubject.asObservable();
  constructor(private http: HttpClient) {}

 
  addFinishCategory(data: FinishCategoryDTO): Observable<FinishCategoryDTO> {
    const formData = new FormData();
    formData.append('Title', data.title);
    formData.append('Image', data.image as Blob, data.image?.name);

    return this.http.post<FinishCategoryDTO>(`${this.apiUrl}/AddFinishCategory`, formData);
  }


  getAllFinishCategories(): Observable<FinishCategoryDTO[]> {
    return this.http.get<FinishCategoryDTO[]>(`${this.apiUrl}/GetAll`);
  }


  getFinishCategoryById(id: number): Observable<FinishCategoryDTO> {
    return this.http.get<FinishCategoryDTO>(`${this.apiUrl}/${id}`);
  }


  updateFinishCategory(id: number, data: FinishCategoryDTO): Observable<FinishCategoryDTO> {
    const formData = new FormData();
    formData.append('Title', data.title);
    if (data.image) {
      formData.append('Image', data.image);
    }

    return this.http.put<FinishCategoryDTO>(`${this.apiUrl}/${id}`, formData);
  }


  deleteFinishCategory(id: number | undefined): Observable<FinishCategoryDTO> {
    return this.http.delete<FinishCategoryDTO>(`${this.apiUrl}/${id}`);
  }


  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${imageName}`, {
      responseType: 'blob'
    });
  }
}
