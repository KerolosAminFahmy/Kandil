import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Slider } from '../Models/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private apiUrl = environment.apiUrl+"/Sliders/";
  Massege = inject(ToastService) 
  private sliderSubject = new BehaviorSubject<Slider[]>([]);
  public sliders$ = this.sliderSubject.asObservable();
  constructor(private http :HttpClient) { }
  getSliders(): void {
    this.http
      .get<Slider[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          //this.Massege.showMessage('Error loading sliders');
          throw error;
        })
      )
      .subscribe((sliders) => {
        this.sliderSubject.next(sliders);
      });
  }

  addSliderItem(mediaType: string, media: File): Observable<Slider> {
    const formData = new FormData();
    formData.append('mediaType', mediaType);
    formData.append('media', media, media.name);

    return this.http
      .post<Slider>(this.apiUrl, formData)
      .pipe(
        map((newSlider) => {
          this.Massege.showMessage("success","نجاح","تم اضافه بنجاح")
          const currentSliders = this.sliderSubject.value;
          this.sliderSubject.next([...currentSliders, newSlider]);
          return newSlider;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  deleteSliderItem(sliderId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}${sliderId}`)
      .pipe(
        map(() => {
          this.Massege.showMessage("success","نجاح","تم حذف بنجاح")
          const currentSliders = this.sliderSubject.value;
          this.sliderSubject.next(currentSliders.filter((slider) => slider.id !== sliderId));
        }),
        catchError((error) => {
          throw error;
        })
      );
  }
}
