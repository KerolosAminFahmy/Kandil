import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PageSection } from '../Models/model';

@Injectable({
  providedIn: 'root'
})
export class PageSectionService {

private apiUrl =  environment.apiUrl+'/PageSection';

  constructor(private http: HttpClient) {}

  getAll() :Observable<PageSection[]> {
    return this.http.get<PageSection[]>(this.apiUrl);
  }

  update(id: number, data: FormData) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

}
