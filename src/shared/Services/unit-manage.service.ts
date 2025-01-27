import { inject, Injectable } from '@angular/core';
import { AddUnitsDTO, ShowUnitsDTO, unit, Units, UpdateUnitsDTO } from '../Models/model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitManageService {
  //private apiUrl = 'https://localhost:7289/api/Units/'; 
  private apiUrl =  environment.apiUrl+'/Units/'; 
  private UnitSubject = new BehaviorSubject<Units[]>([]);
  public units$ = this.UnitSubject.asObservable();
  constructor(private http: HttpClient) { }
  Massege = inject(ToastService) 
  router = inject(Router)
  GetAllUnits():Observable<Units[]>{
    return this.http.get<Units[]>(this.apiUrl+"GetAllUnits")

  } 
  GetUnits():Observable<Units[]>{
    return this.http.get<Units[]>(this.apiUrl+"GetUnits")
  }
  FetchAllUnit(id:number){
    this.http.get<Units[]>(this.apiUrl+id).subscribe(data => {
      this.UnitSubject.next(data);
      
    },
    error => {
      console.error('Error adding area:', error);
    })
  }
  search(id:number):Observable<Units[]>{
    console.log(id)
    return this.http.get<Units[]>(this.apiUrl+"search/"+id);
  }
  FetchAllUnitHome():Observable<Units[]>{
    return this.http.get<Units[]>(this.apiUrl+"GetAllUnitHome")
   
  }
  FetchAllPaid():Observable<Units[]>{
    return this.http.get<Units[]>(this.apiUrl+"GetAllPaidUnit")
  }
  AddUnit(NewUnit:AddUnitsDTO){
    const formData=new FormData();
    // Append fields from NewUnit to formData
  formData.append('projectId', NewUnit.projectId.toString());
  formData.append('title', NewUnit.title);
  formData.append('description', NewUnit.description);
  formData.append('status', NewUnit.status);
  formData.append('codeUnit', NewUnit.codeUnit);
  formData.append('area', NewUnit.area.toString());
  formData.append('numberBathroom', NewUnit.numberBathroom.toString());
  formData.append('numberRoom', NewUnit.numberRoom.toString());
  formData.append('yearOfBuild', NewUnit.yearOfBuild.toString());
  formData.append('price', NewUnit.price.toString());
  formData.append('videoUrl', NewUnit.videoUrl);
  formData.append('NameLocation', NewUnit.nameLocation);
  formData.append('Latitude', NewUnit.latitude.toString());
  formData.append('Longitude', NewUnit.Longitude.toString());
  formData.append('TypePrice', NewUnit.typePrice);
  formData.append('IsShown', NewUnit.isShown.toString());

  // If a single image is provided
  if (NewUnit.image) {
    formData.append('image', NewUnit.image, NewUnit.image.name);
  }

  // If detail images are provided (multiple)
  if (NewUnit.detailImage) {
    NewUnit.detailImage.forEach((image) => {
      formData.append('detailImage', image, image.name);
    });
  }

  // If advantages are provided
  if (NewUnit.advantage) {
    NewUnit.advantage.forEach((advantage) => {
      formData.append('advantage', advantage);
    });
  }

  // If services are provided
  if (NewUnit.services) {
    NewUnit.services.forEach((service) => {
      formData.append('services', service);
    });
  }
    this.http.post<void>(this.apiUrl+"AddUnit", formData).subscribe(
      (data) => {
        this.Massege.showMessage("success","نجاح","تم اضافه الوحده بنجاح")
        this.router.navigate([`/dashboard/Projects/AllUnit/${NewUnit.projectId}`])
      },
      (error) => {
        console.error('Error adding unit:', error);
      }
    );
  }
  fetchUpdate(id:number):Observable<ShowUnitsDTO>{
    return this.http.get<ShowUnitsDTO>(this.apiUrl+"GetDetailUnits/"+id).pipe(
      tap(() => {
      })
    )
  }
  UpdateUnit(updateData:UpdateUnitsDTO){
    const formData = new FormData();
  // Append primitive fields
  formData.append('id', updateData.id.toString());
  formData.append('title', updateData.title);
  formData.append('description', updateData.description);
  formData.append('status', updateData.status);
  formData.append('codeUnit', updateData.codeUnit);
  formData.append('area', updateData.area.toString());
  formData.append('numberBathroom', updateData.numberBathroom.toString());
  formData.append('numberRoom', updateData.numberRoom.toString());
  formData.append('yearOfBuild', updateData.yearOfBuild.toString());
  formData.append('price', updateData.price.toString());
  formData.append('videoUrl', updateData.videoUrl);
  formData.append('projectId', updateData.projectId.toString());
  formData.append('NameLocation', updateData.nameLocation);
  formData.append('Latitude', updateData.latitude.toString());
  formData.append('Longitude', updateData.Longitude.toString());
  formData.append('TypePrice', updateData.typePrice);
  formData.append('IsShown', updateData.isShown.toString());

  // Append nullable image if it exists
  if (updateData.image) {
    formData.append('image', updateData.image);
  }
  updateData.advantageUnits.forEach((advantage, index) => {
    formData.append(`AdvantageUnits[${index}].Id`, advantage.id.toString());
    formData.append(`AdvantageUnits[${index}].Text`, advantage.text.toString());
  });
  updateData.serviceUnits.forEach((service, index) => {
    formData.append(`ServiceUnits[${index}].Id`, service.id.toString());
    formData.append(`ServiceUnits[${index}].Text`, service.text.toString());
  });
  // Append arrays after stringifying them
  updateData.unitImages.forEach((unitImage, index) => {
    formData.append(`unitImages[${index}].id`, unitImage.id.toString());
    formData.append(`unitImages[${index}].image`, unitImage.image);
  });
    updateData.AllRemovedAdvantage.forEach((id, index) => {
    formData.append(`allRemovedAdvantage[${index}]`, id.toString());
  });

  updateData.AllRemovedServices.forEach((id, index) => {
    formData.append(`allRemovedServices[${index}]`, id.toString());
  });

  updateData.AllRemovedImages.forEach((id, index) => {
    formData.append(`allRemovedImages[${index}]`, id.toString());
  });
    this.http.put(this.apiUrl, formData).subscribe(
      (data:any) => {
        this.Massege.showMessage("success","نجاح","تم تعديل الوحده بنجاح")
        this.router.navigate([`/dashboard/Projects/AllUnit/${data.id}`])
      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }
  DeleteUnit(id:number){
    this.http.delete<string>(`${this.apiUrl}${id}`).subscribe(
      (data) => {
  
        const currentCities = this.UnitSubject.getValue();
        const updatedCities = currentCities.filter((c) => c.id !== id);
        this.UnitSubject.next(updatedCities);
        this.Massege.showMessage("success","نجاح","تم حذف الوحده بنجاح")

      },
      (error) => {
        console.error('Error deleting area:', error); 
      }
  )
  }
  toggleVisibility(unitId: number):Observable<any> {
    return this.http
      .put(`${this.apiUrl}units/${unitId}/toggle-visibility`, {})
      
  }
}
