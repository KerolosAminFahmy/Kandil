import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FinisghItemService } from '../../../../shared/Services/finisgh-item.service';
import { ToastService } from '../../../../shared/Services/toast.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { ImageUploadComponent } from '../../../../shared/image-upload/image-upload.component';
import { FinishItemDTO } from '../../../../shared/Models/model';
import { Subscription } from 'rxjs';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-edit-finish-item',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,GoogleMapsModule,NgxEditorModule,ImageUploadComponent],
  templateUrl: './edit-finish-item.component.html',
  styleUrl: './edit-finish-item.component.css'
})
export class EditFinishItemComponent {
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
  isFormInit:boolean=false;
  ImagesIdRemoved:Array<number>=[];
  isMainImageChange:boolean=false;
  finishForm!: FormGroup;
  finishCategoryId:number=0;
  finishId:number=0;
  apiUrl:string=environment.apiUrl
  private subscriptions: Subscription = new Subscription();

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
    private Massege:ToastService){
      this.editor=new Editor();
    }
  ngOnInit(): void {
    const paramSub = this.route.params.subscribe(params => {
      this.finishCategoryId = +params['FinishCategory'] 
      this.finishId = +params['finishItem'] 
    });
    this.finishForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      NameLocation: ['', [Validators.required, Validators.maxLength(500)]],
      image: [null, Validators.required],
      videoUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+$/)]],
      detailImages: this.fb.array([])
    });

   const Sub = this.ServiceFinish.getFinishItem(this.finishId).subscribe((data)=>{
      this.finishForm.patchValue({
        title: data.finishItem.title,
        description:data.finishItem.description,
        image: data.finishItem.imageName,
        NameLocation:data.finishItem.nameLocation,
        videoUrl: data.finishItem.videoUrl,
      })
      const  center1: google.maps.LatLngLiteral = {
        lat: data.finishItem.latitude,
        lng: data.finishItem.longitude
      };
      this.markerPosition=center1
      this.center=center1

      data.finishImages.forEach((e)=>{
        this.addInitDetailImage(e.imageName,e.id)
      })  

      this.isFormInit=true

    })
    this.subscriptions.add(Sub);
    this.subscriptions.add(paramSub);

  }
  get detailImages(): FormArray {
    return this.finishForm.get('detailImages') as FormArray;
  }
  addDetailImage(): void {
    const ImageGroup = this.fb.group({
      image: [null, Validators.required],
      id:[0]
    });
    this.detailImages.push(ImageGroup);
  }
  removeDetailImage(index: number): void {
    if(this.detailImages.at(index).value.id>0){
      this.ImagesIdRemoved.push(this.detailImages.at(index).value.id)
    }
    this.detailImages.removeAt(index);
  }
  addInitDetailImage(image:string,id:number): void {
    const ImageGroup = this.fb.group({
      image: [image, Validators.required],
      id:[id]
    });
    this.detailImages.push(ImageGroup);
  }
  onFileChange(event: { file: File | null}, index: number): void {
    if (event.file && index>-1) {
      
      this.detailImages.at(index).get('image')?.setValue(event.file);
      this.detailImages.at(index).get('image')?.markAsTouched()
    }else if(event.file && index===-1){
      if (this.finishForm.get('image')?.value !== null && 
      typeof this.finishForm.get('image')?.value === 'object' && !Array.isArray(this.finishForm.get('image')?.value)) {
        this.isMainImageChange=true;
      }
      this.finishForm.get("image")?.setValue(event.file)

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
            id:this.finishId,
            longitude:this.center.lng,
            latitude:this.center.lat,
            nameLocation:valueForm.NameLocation,
            finishCategoryId:this.finishCategoryId,
            title:valueForm.title,
            description:valueForm.description,
            image:this.isMainImageChange?valueForm.image:null,
            videoUrl:valueForm.videoUrl,
            detailImage: this.detailImages.value
                .filter((e: any) => e.id <= 0)
                .map((e: {image:File,id:number}) => e.image) as File[],
            allRemovedImages:this.ImagesIdRemoved
          }
          this.ServiceFinish.updateFinishItem(NewUnit).subscribe((data)=>{
            this.router.navigate(['/dashboard/FinishCategory/',this.finishCategoryId])
            this.Massege.showMessage("success","نجاح","تم تعديل تشطيب بنجاح")
          })
      }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.editor.destroy();
  }
}
