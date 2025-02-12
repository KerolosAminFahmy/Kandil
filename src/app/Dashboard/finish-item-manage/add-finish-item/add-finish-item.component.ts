import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FinishItemDTO } from '../../../../shared/Models/model';
import { FinisghItemService } from '../../../../shared/Services/finisgh-item.service';
import { ToastService } from '../../../../shared/Services/toast.service';
import { Subscription } from 'rxjs';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-add-finish-item',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgxEditorModule,GoogleMapsModule],
  templateUrl: './add-finish-item.component.html',
  styleUrl: './add-finish-item.component.css'
})
export class AddFinishItemComponent {
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  finishForm!: FormGroup;
  finishCategoryId:number=0;
 
  mapsUrl: string = '';
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 30.0444,
    lng: 31.2357
  };
  zoom = 6;
  private subscriptions: Subscription = new Subscription();

  markerPosition: google.maps.LatLngLiteral = this.center;
  constructor(private fb: FormBuilder,private route : ActivatedRoute,
    private ServiceFinish:FinisghItemService,private router:Router,
    private Massege:ToastService){
      this.editor=new Editor();
    }
  ngOnInit(): void {
    const Sub = this.route.params.subscribe(params => {
      this.finishCategoryId = +params['FinishCategory'] 
    });
    this.finishForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      NameLocation: ['', [Validators.required, Validators.maxLength(500)]],
      image: [null, Validators.required],
      videoUrl: ['', [Validators.required]],
      detailImages: this.fb.array([])
    });
    this.subscriptions.add(Sub);

  }
  get detailImages(): FormArray {
    return this.finishForm.get('detailImages') as FormArray;
  }
  extractYouTubeSrc(embedCode: string): string | null {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }
  addDetailImage(): void {
    this.detailImages.push(this.fb.control(null, Validators.required));
  }
  removeDetailImage(index: number): void {
    this.detailImages.removeAt(index);
  }
  onFileSelect(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && index>-1) {
      this.detailImages.at(index).setValue(input.files[0]);
    }else if(input.files && input.files.length > 0){
      this.finishForm.get("image")?.setValue(input.files[0])
    }
  }
  moveMap(event: google.maps.MapMouseEvent): void {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
      this.markerPosition = event.latLng.toJSON();
      this.updateMapsUrl();
    }
  }

  move(event: google.maps.MapMouseEvent): void {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }
  updateMapsUrl(): void {
    const { lat, lng } = this.markerPosition;
    this.mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  }
  onSubmit(){
 if (this.finishForm.valid) {
      const valueForm=this.finishForm.value
      const NewUnit:FinishItemDTO={
        finishCategoryId:this.finishCategoryId,
        title:valueForm.title,
        description:valueForm.description,
        image:valueForm.image,
        longitude:this.center.lng,
        latitude:this.center.lat,
        nameLocation:valueForm.NameLocation,
        videoUrl:this.extractYouTubeSrc(valueForm.videoUrl)||"",
        detailImage:this.detailImages.value,
      }
      this.ServiceFinish.AddFinishItem(NewUnit).subscribe((data)=>{
        this.router.navigate(['/dashboard/FinishCategory/',this.finishCategoryId])
        this.Massege.showMessage("success","نجاح","تم اضافه تشطيب بنجاح")
      })
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.editor.destroy();
  }
}
