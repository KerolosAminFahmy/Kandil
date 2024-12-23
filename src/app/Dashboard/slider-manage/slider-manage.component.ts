import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SliderService } from '../../../shared/Services/slider.service';
import { Slider } from '../../../shared/Models/model';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider-manage',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './slider-manage.component.html',
  styleUrl: './slider-manage.component.css'
})
export class SliderManageComponent {

  isPopupOpen = false;
  imgPath:string=environment.apiImage+"Slider/";
  sliderForm: FormGroup;
  selectedFile: File | null = null;
  AllSliderItem:Slider[]=[];
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private http: HttpClient,private sliderService:SliderService) {
    this.sliderForm = this.fb.group({
      mediaType: ['image', Validators.required], 
      media: [null, Validators.required], 
    });
  }
  ngOnInit(): void {
    this.sliderService.getSliders();
    const Sub = this.sliderService.sliders$.subscribe((item)=>{
      this.AllSliderItem=item;
    })
    this.subscriptions.add(Sub);

  }
  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.sliderForm.reset(); 
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.sliderForm.patchValue({ media: file });
    }
  }

  addSliderItem() {
    if (this.sliderForm.invalid) return;

    this.sliderService.addSliderItem(this.sliderForm.value.mediaType,this.selectedFile!).subscribe(()=>{
      this.closePopup()
    })

  }
  onDelete(id: number) {
    this.sliderService.deleteSliderItem(id).subscribe(()=>{});
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
