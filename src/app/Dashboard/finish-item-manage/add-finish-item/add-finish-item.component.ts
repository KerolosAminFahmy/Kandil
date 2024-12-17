import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FinishItemDTO } from '../../../../shared/Models/model';
import { FinisghItemService } from '../../../../shared/Services/finisgh-item.service';
import { ToastService } from '../../../../shared/Services/toast.service';

@Component({
  selector: 'app-add-finish-item',
  standalone: true,
  imports: [ReactiveFormsModule,EditorComponent,CommonModule,GoogleMapsModule],
  templateUrl: './add-finish-item.component.html',
  styleUrl: './add-finish-item.component.css'
})
export class AddFinishItemComponent {
  apikey:string=environment.apiKey;
  
  finishForm!: FormGroup;
  finishCategoryId:number=0;
  init: EditorComponent['init'] = {
    plugins: [
      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',

    ],
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
    exportword_converter_options: { 'document': { 'size': 'Letter' } },
    importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline',	'defaults': 'inline', } },
  };
  mapsUrl: string = '';
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 30.0444,
    lng: 31.2357
  };
  zoom = 6;
  markerPosition: google.maps.LatLngLiteral = this.center;
  constructor(private fb: FormBuilder,private route : ActivatedRoute,
    private ServiceFinish:FinisghItemService,private router:Router,
    private Massege:ToastService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.finishCategoryId = +params['FinishCategory'] 
    });
    this.finishForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      NameLocation: ['', [Validators.required, Validators.maxLength(500)]],
      image: [null, Validators.required],
      videoUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+$/)]],
      detailImages: this.fb.array([])
    });
    
  }
  get detailImages(): FormArray {
    return this.finishForm.get('detailImages') as FormArray;
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
        videoUrl:valueForm.videoUrl,
        detailImage:this.detailImages.value,
      }
      console.log(NewUnit)
      this.ServiceFinish.AddFinishItem(NewUnit).subscribe((data)=>{
        this.router.navigate(['/dashboard/FinishCategory/',this.finishCategoryId])
        this.Massege.showMessage("success","نجاح","تم اضافه تشطيب بنجاح")
      })
    }
  }
}
