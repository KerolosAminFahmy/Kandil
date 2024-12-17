import { inject, Injectable } from '@angular/core';
import { AddArea, AllAreaDTO, Area, EditArea, ViewAreaDTO } from '../Models/model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  //private apiUrl = 'https://localhost:7289/api/Areas/'; 
  private apiUrl = environment.apiUrl+"/Areas/"; 
  Massege = inject(ToastService) 
  private AreaSubject = new BehaviorSubject<AllAreaDTO[]>([]);
  public areas$ = this.AreaSubject.asObservable();
  constructor(private http: HttpClient) { }
  fetchArea(){
    this.http.get<AllAreaDTO[]>(this.apiUrl+"AllAreas").subscribe((data) => {
      this.AreaSubject.next(data);
    });
  }
  fetchAreaByCity(id:number):Observable<{title:string,data:ViewAreaDTO[]}>{
    return this.http.get<{title:string,data:ViewAreaDTO[]}>(this.apiUrl+"GetAreaByCity/"+id).pipe(
      tap(() => {
        
      })
    );
  }
  editCity(id: number, EditCityDTO: EditArea){
    const formData = new FormData();
    formData.append('Name', EditCityDTO.Name);
    formData.append('CityId', EditCityDTO.CityId.toString());
    if (EditCityDTO.Image) {
      formData.append('Image', EditCityDTO.Image); 
    }
    this.http.put<Area>(`${this.apiUrl}${id}`, formData).subscribe((data)=>{

      const currentAreas = this.AreaSubject.getValue();

      const updatedAreas = currentAreas.map(city => {
        if (city.id === id) {
          return {
            ...city,
            name: data.name, 
            imageName: data.imageName, 
          };
        }
        return city; 
      });
      this.AreaSubject.next(updatedAreas);
      this.Massege.showMessage("success","نجاح","تم تعديل المنطقه بنجاح")

    },
    (error) => {
      console.error('Error editing city:', error); 
    })
    
  }
  AddArea(AreaRecord:AddArea){
    const formData = new FormData();
    formData.append('Name', AreaRecord.Name); 
    formData.append('Image', AreaRecord.Image);
    formData.append('CityId', AreaRecord.CityId.toString());
    this.http.post<Area>(this.apiUrl+"AddArea", formData,

    ).subscribe(
      data => {  
        const newRecord = {
          id: data.id,
          name: data.name,
          imageName: data.imageName,
        };
  
        const currentAreas = this.AreaSubject.getValue();
  
        const updatedAreas = currentAreas.map(city => {
          if (city.id == data.cityId) {
            return {
              city: city.city,
              id:city.id,
              viewAreas: [...city.viewAreas, newRecord] // Add new area to the viewAreas array
            };
          }
          return city;
        });
        this.Massege.showMessage("success","نجاح","تم اضافه المنطقه بنجاح")
        this.AreaSubject.next(updatedAreas);
      },
      error => {
        console.error('Error adding area:', error);
      }
    );
  }
  DeleteArea(id:number){
    this.http.delete<Area>(`${this.apiUrl}${id}`).subscribe(
      (data) => {
  
        const currentAreas = this.AreaSubject.getValue();
  
        const updatedAreas = currentAreas.map(city => {
          if (city.id === data.cityId) {
            return {
              ...city,
              viewAreas: city.viewAreas.filter(area => area.id !== id) 
            };
          }
          return city; 
        });
        this.Massege.showMessage("success","نجاح","تم حذف المنطقه بنجاح")

            this.AreaSubject.next(updatedAreas);
      },
      (error) => {
        console.error('Error deleting area:', error); 
      }
  )
  }
}
