import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { AddCity, City, EditCity } from '../Models/model';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = environment.apiUrl+"/Cities/"; // Replace with your API's base URL
  Massege = inject(ToastService) 
  private citiesSubject = new BehaviorSubject<City[]>([]);
  public cities$ = this.citiesSubject.asObservable();

  constructor(private http: HttpClient) {
    
  }

  // Fetch cities from the API and update BehaviorSubject
  fetchCities(): void {
    
    this.http.get<City[]>(this.apiUrl+"GetAll").subscribe((data) => {
      this.citiesSubject.next(data);
    });
  }

  // Add a new city and update BehaviorSubject
  addCity(city: AddCity): void {
    const api=environment.apiUrl+"/Cities/AddCity"
    const formData = new FormData();
    formData.append('Title', city.Title); 
    formData.append('Image', city.image);
    this.http.post<City>(api, formData,

    ).subscribe(
     data =>{
      const currentCities = this.citiesSubject.getValue();
        this.citiesSubject.next([...currentCities, data]);
        this.Massege.showMessage("success","نجاح","تم اضافه المدينه بنجاح")
     }
    );
  }

  editCity(id: number, EditCityDTO: EditCity): Observable<City> {
    const formData = new FormData();
    formData.append('Title', EditCityDTO.Title);
    if (EditCityDTO.image) {
      formData.append('Image', EditCityDTO.image);
    }
    this.http.put<City>(`${this.apiUrl}${id}`, formData).subscribe((data)=>{
      const currentCities = this.citiesSubject.getValue();
      const updatedCities = currentCities.map((c) =>
        c.id === id ? data : c
      );
      this.citiesSubject.next(updatedCities);
      this.Massege.showMessage("success","نجاح","تم تعديل المدينه بنجاح")

    })
    return this.http.put<City>(`${this.apiUrl}${id}`, formData).pipe(
      tap((updatedCity) => {
        const currentCities = this.citiesSubject.getValue();
        const updatedCities = currentCities.map((c) =>
          c.id === id ? updatedCity : c
        );
        this.citiesSubject.next(updatedCities);
      })
    );
  }
  getImage(url:string){
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
          // Convert Blob to File
          const file = new File([blob], 'image.jpg', { type: blob.type });

          // Optionally create an object URL for preview
          const objectURL = URL.createObjectURL(blob);
      },
      error: (err) => {
          console.error('Error fetching image:', err);
      },
  });
  }
  deleteCity(id: number): Observable<City> {
    return this.http.delete<City>(`${this.apiUrl}${id}`).pipe(
      tap(() => {
        const currentCities = this.citiesSubject.getValue();
        const updatedCities = currentCities.filter((c) => c.id !== id);
        this.citiesSubject.next(updatedCities);
        this.Massege.showMessage("success","نجاح","تم حذف المدينه بنجاح")

      })
    );
  }
}
