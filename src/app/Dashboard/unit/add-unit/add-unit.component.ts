import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { Loader } from '@googlemaps/js-api-loader';

import { AddUnitsDTO } from '../../../../shared/Models/model';
import { ActivatedRoute } from '@angular/router';
import { UnitManageService } from '../../../../shared/Services/unit-manage.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../../../../environments/environment';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-add-unit',
  standalone: true,
  imports: [ReactiveFormsModule, GoogleMapsModule ,CommonModule,NgxEditorModule],
  templateUrl: './add-unit.component.html',
  styleUrl: './add-unit.component.css'
})
export class AddUnitComponent {
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
  unitForm!: FormGroup;
  projectId:number=0;
  
  mapsUrl: string = '';


  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 30.0444,
    lng: 31.2357
  };
  zoom = 6;
  markerPosition: google.maps.LatLngLiteral = this.center;
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
 
  constructor(private fb: FormBuilder,private route : ActivatedRoute,private UnitService:UnitManageService) {
    this.editor=new Editor();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'] 
    });
    this.unitForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.maxLength(1000)]],
      NameLocation: ['', [Validators.required, Validators.maxLength(500)]],
      image: [null, Validators.required],
      isShown:[false,Validators.required],
      status: ['Available', [Validators.pattern(/^(Available|Sold)$/)]],
      typePrice: ['Available', [Validators.pattern(/^(Available|Sold)$/)]],
      codeUnit: ['', [Validators.maxLength(20)]],
      area: [null, [Validators.required,  Validators.min(1)]],
      numberBathroom: [null, [Validators.required,  Validators.min(1)]],
      numberRoom: [null, [ Validators.required, Validators.min(1)]],
      yearOfBuild: [null, [ Validators.min(1800), Validators.max(2100)]],
      price: [null, [ Validators.required, Validators.min(1)]],
      videoUrl: ['', []],
      advantages: this.fb.array([]),
      services: this.fb.array([]),
      detailImages: this.fb.array([])
    });
  }
  get advantages(): FormArray {
    return this.unitForm.get('advantages') as FormArray;
  }
  get services(): FormArray {
    return this.unitForm.get('services') as FormArray;
  }
  get detailImages(): FormArray {
    return this.unitForm.get('detailImages') as FormArray;
  }
  addAdvantage(): void {
    const advantageGroup = this.fb.group({
      advantage: ['', Validators.required]
    });
    this.advantages.push(advantageGroup);
  }
  removeAdvantage(index: number): void {
    this.advantages.removeAt(index);
  }
  addService(): void {
    const serviceGroup = this.fb.group({
      service: ['', Validators.required]
    });
    this.services.push(serviceGroup);
  }
  removeService(index: number): void {
    this.services.removeAt(index);
  }
  addDetailImage(): void {
    this.detailImages.push(this.fb.control(null, Validators.required));
  }
  removeDetailImage(index: number): void {
    this.detailImages.removeAt(index);
  }
  extractYouTubeSrc(embedCode: string): string | null {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }
  onFileSelect(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && index>-1) {
      this.detailImages.at(index).setValue(input.files[0]);
    }else if(input.files && input.files.length > 0){
      this.unitForm.get("image")?.setValue(input.files[0])
    }
    if(index>-1){
      this.detailImages.at(index).markAsTouched()

    }else if(index==-1){
      this.unitForm.get("image")?.markAsTouched()

    }
  }

  onSubmit(): void {

    if (this.unitForm.valid) {
      const valueForm=this.unitForm.value
      const NewUnit:AddUnitsDTO={
        services:this.services.value.map((e:any)=>{
          return e.service
        }),
        status:valueForm.status,
        projectId:this.projectId,
        title:valueForm.title,
        description:valueForm.description,
        image:valueForm.image,
        codeUnit:valueForm.codeUnit,
        Longitude:this.center.lng,
        latitude:this.center.lat,
        isShown:valueForm.isShown,
        nameLocation:valueForm.NameLocation,
        area: valueForm.area,
        numberBathroom:valueForm.numberBathroom,
        numberRoom:valueForm.numberRoom,
        yearOfBuild:valueForm.yearOfBuild,
        price:valueForm.price,
        videoUrl:this.extractYouTubeSrc(valueForm.videoUrl)||"",
        detailImage:this.detailImages.value,
        typePrice:valueForm.typePrice=="Available"?'مقدم':'تقسيط',
        advantage:this.advantages.value.map((e:any)=>{
          return e.advantage
        }),

      }
      this.UnitService.AddUnit(NewUnit)
    }
  }
  ngOnDestroy(): void {
    this.editor.destroy()
    
  }
}
