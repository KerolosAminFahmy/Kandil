import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CoverImage } from '../Models/model';

@Injectable({
  providedIn: 'root'
})
export class CoverImageService {
  private apiUrl = environment.apiUrl + "/CoverImage";
  private CoverSubject = new BehaviorSubject<CoverImage[]>([]);
  public Covers$ = this.CoverSubject.asObservable();
  constructor(private http: HttpClient) {}

  getAllCoverImages(): Observable<CoverImage[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getCoverImageById(id: number): Observable<CoverImage> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateCoverImage(
    id: number,
    mediaType: string,
    formFile: File | null
  ): Observable<void> {
    const formData = new FormData();
    formData.append('MediaType', mediaType);

    if (formFile) {
      formData.append('formFile', formFile);
    }

    return this.http.put<void>(`${this.apiUrl}?id=${id}`, formData, {
      headers: new HttpHeaders({
        
      }),
    });
  }
}
