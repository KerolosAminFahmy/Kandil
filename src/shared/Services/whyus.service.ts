import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhyusService {
  //private apiUrl = 'https://localhost:7289/api/WhyUs';
  private apiUrl =  environment.apiUrl+'/WhyUs';

  constructor(private http: HttpClient) {}
  get(id:number|null){
    return this.http.get<{fullDescription:string,imageUrl:String,quote:string,title:string}>(this.apiUrl+"/"+id)
  }
  getAll() :any {
    return this.http.get(this.apiUrl);
  }

  update(id: number, data: FormData) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  updateImage(data: FormData){
    return this.http.put(`${this.apiUrl}/UploadImage`, data);
  }
}
