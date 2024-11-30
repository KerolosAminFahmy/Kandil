import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MediaDTO } from '../Models/model';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  //private apiUrl = 'https://localhost:7289/api/Media/'; 
  private apiUrl =  environment.apiUrl+'/Media/'; 
  Massege = inject(ToastService) 
  router = inject(Router) 

  private mediaSubject = new BehaviorSubject<MediaDTO[]>([]);
  public Media$ = this.mediaSubject.asObservable();
  route: ActivatedRoute | null | undefined;
  constructor(private http: HttpClient) { }
  getAll(): void {
    this.http.get<MediaDTO[]>(this.apiUrl).subscribe({
      next: (data) => this.mediaSubject.next(data),
      error: (err) => console.error('Error fetching all media:', err),
    });
  }

  getById(id: number):Observable<MediaDTO> {
    return this.http.get<MediaDTO>(`${this.apiUrl}${id}`);
  }

  getByMediaCategory(categoryId: number): void {
    this.http.get<MediaDTO[]>(`${this.apiUrl}GetByMediaCategory/${categoryId}`).subscribe({
      next: (data) => this.mediaSubject.next(data),
      error: (err) => console.error(`Error fetching media by category ID ${categoryId}:`, err),
    });
  }

  create(mediaDTO: MediaDTO): void {
    const formData = this.createFormData(mediaDTO);
    this.http.post<MediaDTO>(this.apiUrl, formData).subscribe({
      next: (newMedia) => {
        const updatedMediaList = [...this.mediaSubject.value, newMedia];
        this.mediaSubject.next(updatedMediaList);
        this.router.navigate([`/dashboard/MediaCategory`])

        this.Massege.showMessage("success","نجاح","تم اضافه ميديا بنجاح")
        

      },
      error: (err) => console.error('Error creating new media:', err),
    });
  }

  update(id: number, mediaDTO: MediaDTO): void {
    const formData = this.createFormData(mediaDTO);
    this.http.put<MediaDTO>(`${this.apiUrl}${id}`, formData).subscribe({
      next: (updatedMedia) => {
        const updatedMediaList = this.updateMediaList(updatedMedia);
        this.mediaSubject.next(updatedMediaList);
        this.router.navigate([`/dashboard/MediaCategory`])

        this.Massege.showMessage("success","نجاح","تم تعديل ميديا بنجاح")

      },
      error: (err) => console.error(`Error updating media with ID ${id}:`, err),
    });
  }

  delete(id: number|undefined): void {
    this.http.delete<void>(`${this.apiUrl}${id}`).subscribe({
      next: () => {
        const updatedMediaList = this.mediaSubject.value.filter((media) => media.id !== id);
        this.mediaSubject.next(updatedMediaList);
        this.Massege.showMessage("success","نجاح","تم حذف ميديا بنجاح")

      },
      error: (err) => console.error(`Error deleting media with ID ${id}:`, err),
    });
  }

  private createFormData(mediaDTO: MediaDTO): FormData {
    const formData = new FormData();
    
    if (mediaDTO.id !== undefined) {
      formData.append('Id', mediaDTO.id.toString());
    }
    formData.append('Title', mediaDTO.title);
    formData.append('Description', mediaDTO.description);
    const createdDate = mediaDTO.created instanceof Date ? mediaDTO.created : new Date(mediaDTO.created);

    formData.append('Created', createdDate.toISOString());
    
    formData.append('videoURl', mediaDTO.videoUrl);
    if(mediaDTO.mediaId !== undefined){
      formData.append('MediaId', mediaDTO.mediaId.toString());
    }
    
    if (mediaDTO.image) {
      formData.append('Image', mediaDTO.image);
    }
    return formData;
  }

  private updateMediaList(media: MediaDTO): MediaDTO[] {
    const existingMedia = this.mediaSubject.value.find((m) => m.id === media.id);
    if (existingMedia) {
      return this.mediaSubject.value.map((m) => (m.id === media.id ? media : m));
    }
    return [...this.mediaSubject.value, media];
  }
}
