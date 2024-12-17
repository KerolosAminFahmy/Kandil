import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinishItemDetailDTO, FinishItemDTO } from '../Models/model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinisghItemService {
  private readonly apiUrl = environment.apiUrl+"/FinishItem";

  constructor(private http:HttpClient) { }
  getAllFinishItem(id:number):Observable<FinishItemDTO[]>{
    return this.http.get<FinishItemDTO[]>(this.apiUrl+"/getFinishItem/"+id)
  }
  getFinishItem(id:number):Observable<FinishItemDetailDTO>{
    return this.http.get<FinishItemDetailDTO>(this.apiUrl+"/getDetailFinishItem/"+id)
  }
  getFinishItemWithName(id:number):Observable<{name:string,data:FinishItemDTO[]}>{
    return this.http.get<{name:string,data:FinishItemDTO[]}>(this.apiUrl+"/getAllFinishItemWithName/"+id)
  }
  AddFinishItem(newItem:FinishItemDTO):Observable<FinishItemDTO>{
    const data = this.convertClassToDataForm(newItem);
    return this.http.post<FinishItemDTO>(this.apiUrl+"/AddFinishItem",data)
  }
  DeleteFinishItem(id:number|undefined):Observable<any>{
    return this.http.delete<any>(this.apiUrl+"/"+id)
  }
  updateFinishItem(newFinish:FinishItemDTO):Observable<FinishItemDTO>{
    const data = this.convertClassToDataForm(newFinish);
    return this.http.put<FinishItemDTO>(this.apiUrl,data)

  }
  convertClassToDataForm(newItem:FinishItemDTO):FormData{
    console.log(newItem)
    const formData = new FormData();
      // Add primitive properties
  if (newItem.id !== undefined) formData.append('id', newItem.id.toString());
  formData.append('title', newItem.title);
  formData.append('description', newItem.description);
  formData.append('latitude', newItem.latitude.toString());
  formData.append('longitude', newItem.longitude.toString());
  formData.append('nameLocation', newItem.nameLocation);
  formData.append('videoUrl', newItem.videoUrl);
  formData.append('finishCategoryId', newItem.finishCategoryId.toString());

  // Add optional image name
  if (newItem.imageName) {
    formData.append('imageName', newItem.imageName);
  }

  // Add single file
  if (newItem.image) {
    formData.append('image', newItem.image);
  }

  // Add multiple files
  if (newItem.detailImage && newItem.detailImage.length > 0) {
    newItem.detailImage.forEach((file, index) => {
      formData.append(`detailImage`, file,file.name);
    });
  }

  // Add list of removed image IDs
  if (newItem.allRemovedImages && newItem.allRemovedImages.length > 0) {
    newItem.allRemovedImages.forEach((id, index) => {
      formData.append(`allRemovedImages[${index}]`, id.toString());
    });
  }
  
    return formData
  }
}
