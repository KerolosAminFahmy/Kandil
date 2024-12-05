import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AddMediaCategory, MediaCategory, UpdateMediaCategory } from '../Models/model';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaCategoryService {
  subscribe(arg0: (data: any) => void) {
    throw new Error('Method not implemented.');
  }
  //private apiUrl = 'https://localhost:7289/api/MediaCategory/'; 
  private apiUrl =  environment.apiUrl+'/MediaCategory/'; 
  Massege = inject(ToastService) 

  private MediaCategorySubject = new BehaviorSubject<MediaCategory[]>([]);
  public MediaCategory$ = this.MediaCategorySubject.asObservable();
  constructor(private http: HttpClient) { }
  fetchCities(): void {
    
    this.http.get<MediaCategory[]>(this.apiUrl).subscribe((data) => {
      this.MediaCategorySubject.next(data);
    });
  }
  getById(id: number):Observable<{message:string}> {
    return this.http.get<{message:string}>(`${this.apiUrl}${"GetName/"}${id}`);
  }
  addMediaCategory(MediaCategory: AddMediaCategory): void {
    const formData = new FormData();
    formData.append('title', MediaCategory.title); 
    formData.append('id', "0"); 
    formData.append('ImageName', "0"); 
    formData.append('Image', MediaCategory.image);
    this.http.post<MediaCategory>(this.apiUrl, formData, {
      headers: {
        'enctype': 'multipart/form-data'
      }
    }
    ).subscribe(
     data =>{
      const currentMediaCategory = this.MediaCategorySubject.getValue();
        this.MediaCategorySubject.next([...currentMediaCategory, data]);
        this.Massege.showMessage("success","نجاح","تم اضافه ميديا بنجاح")

     }
    );
  }
  deleteCity(id: number): Observable<MediaCategory> {
    return this.http.delete<MediaCategory>(`${this.apiUrl}${id}`).pipe(
      tap(() => {
        const currentMediaCategory = this.MediaCategorySubject.getValue();
        const updatedCities = currentMediaCategory.filter((c) => c.id !== id);
        this.MediaCategorySubject.next(updatedCities);
        this.Massege.showMessage("success","نجاح","تم حذف ميديا بنجاح")

      })
    );
  }
  editMediaCategory(id:number,updateValue:UpdateMediaCategory){
    const formData = new FormData();
    formData.append('title', updateValue.title); 
    formData.append('id', "0"); 
    formData.append('ImageName', "0"); 
    if (updateValue.image) {
      formData.append('Image', updateValue.image); 
    }
    this.http.put<MediaCategory>(`${this.apiUrl}${id}`, formData).subscribe((data)=>{
      const currentMediaCategory = this.MediaCategorySubject.getValue();
      const updatedMediaCategory = currentMediaCategory.map((c) =>
        c.id === id ? data : c
      );
      this.MediaCategorySubject.next(updatedMediaCategory);
      this.Massege.showMessage("success","نجاح","تم تعديل ميديا بنجاح")

    })
  }
}
