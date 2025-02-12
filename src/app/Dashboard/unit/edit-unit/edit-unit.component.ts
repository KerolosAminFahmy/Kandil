import { Component} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnitManageService } from '../../../../shared/Services/unit-manage.service';
import { AdvantageUnit, ServiceUnit, ShowUnitsDTO, UnitImageDTO, UpdateUnitsDTO } from '../../../../shared/Models/model';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '../../../../shared/image-upload/image-upload.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-edit-unit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,GoogleMapsModule,ImageUploadComponent,NgxEditorModule],
  templateUrl: './edit-unit.component.html',
  styleUrl: './edit-unit.component.css'
})
export class EditUnitComponent {
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
  private subscriptions: Subscription = new Subscription();

  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };
  zoom = 6;
  markerPosition!: google.maps.LatLngLiteral;
  moveMap(event: google.maps.MapMouseEvent): void {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
      this.markerPosition = event.latLng.toJSON();

    }
  }

  unitId:number=0;
  unitForm!: FormGroup;
  unit!:ShowUnitsDTO;
  isFormInit:boolean=false;
  isMainImageChange:boolean=false;
  AdvantageIdRemoved:Array<number>=[];
  ServiceIdRemoved:Array<number>=[];
  ImagesIdRemoved:Array<number>=[];
  ImageUrl:string=environment.apiImage
  apiUrl:string=environment.apiUrl
  constructor(private fb: FormBuilder,private unitService:UnitManageService,private UnitService:UnitManageService , private route :ActivatedRoute) {
    this.editor=new Editor()
  }
  ngOnInit(): void {
    this.unitForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [ Validators.maxLength(1000)]],
      NameLocation: ['', [Validators.required, Validators.maxLength(500)]],
      image: [null, Validators.required],
      isShown:[false,Validators.required],
      status: ['Available', [ Validators.pattern(/^(Available|Sold)$/)]],
      typePrice: ['Available', [ Validators.pattern(/^(Available|Sold)$/)]],
      codeUnit: ['', [ Validators.maxLength(20)]],
      area: [null, [Validators.required, Validators.min(1)]],
      numberBathroom: [null, [Validators.required, Validators.min(1)]],
      numberRoom: [null, [Validators.required, Validators.min(1)]],
      yearOfBuild: [null, [ Validators.min(1800), Validators.max(2100)]],
      price: [null, [Validators.required, Validators.min(1)]],
      videoUrl: ['', [Validators.pattern(/^https?:\/\/.+$/)]],
      advantages: this.fb.array([]),
      services: this.fb.array([]),
      detailImages: this.fb.array([])
    });
    const paramSub = this.route.params.subscribe(params => {
      this.unitId = +params['unitId'] 
    });
    const Sub = this.unitService.fetchUpdate(this.unitId).subscribe((data)=>{
      this.unit=data
      this.unitForm.patchValue({
        title: data.title,
      description:data.description,
      image: data.imageName,
      status: data.status,
      codeUnit: data.codeUnit,
      NameLocation:data.nameLocation,
      area: data.area,
      isShown:data.isShown,
      typePrice:data.typePrice=="مقدم"?"Available":"Sold",
      numberBathroom: data.numberBathroom,
      numberRoom:data.numberRoom,
      yearOfBuild: data.yearOfBuild,
      price: data.price,
      videoUrl: data.videoUrl,
      })
      const  center1: google.maps.LatLngLiteral = {
        lat: data.latitude,
        lng: data.longitude
      };
      this.markerPosition=center1
      this.center=center1
      data.advantageUnits.forEach((e)=>{
        this.addInitAdvantage(e.text,e.id)
      })
      data.serviceUnits.forEach((e)=>{
        this.addInitService(e.text,e.id)
      })
      data.unitImages.forEach((e)=>{
        this.addInitDetailImage(e.imageName,e.id)
        
      })

      this.isFormInit=true
    },(error)=>{
      console.log("erorr",error)
    })
    this.subscriptions.add(Sub);
    this.subscriptions.add(paramSub);

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
  addInitAdvantage(advantage:string,id:number): void {
    const advantageGroup = this.fb.group({
      advantage: [advantage, Validators.required],
      id:[id]
    });
    this.advantages.push(advantageGroup);
  }
  addAdvantage(): void {
    const advantageGroup = this.fb.group({
      advantage: ['', Validators.required],
      id:[0]
    });
    this.advantages.push(advantageGroup);
  }
  removeAdvantage(index: number): void {
    if(this.advantages.at(index).value.id>0){
      this.AdvantageIdRemoved.push(this.advantages.at(index).value.id)
    }
    this.advantages.removeAt(index);
  }
  addService(): void {
    const serviceGroup = this.fb.group({
      service: ['', Validators.required],
      id:[0]
    });
    this.services.push(serviceGroup);
  }
  addInitService(service:string,id:number): void {
    const serviceGroup = this.fb.group({
      service: [service, Validators.required],
      id:[id]
    });
    this.services.push(serviceGroup);
  }
  removeService(index: number): void {
    if(this.services.at(index).value.id>0){
      this.ServiceIdRemoved.push(this.services.at(index).value.id)
    }
      this.services.removeAt(index);
  }
  addInitDetailImage(image:string,id:number): void {
    const ImageGroup = this.fb.group({
      image: [image, Validators.required],
      id:[id]
    });
    this.detailImages.push(ImageGroup);
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

  extractYouTubeSrc(embedCode: string): string | null {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }
  onFileChange(event: { file: File | null}, index: number) {
    
    if (event.file && index>-1) {
      
      this.detailImages.at(index).get('image')?.setValue(event.file);
      this.detailImages.at(index).get('image')?.markAsTouched()
    }else if(event.file && index===-1){
      if (this.unitForm.get('image')?.value !== null && 
      typeof this.unitForm.get('image')?.value === 'object' && !Array.isArray(this.unitForm.get('image')?.value)) {
        this.isMainImageChange=true;
      }
      this.unitForm.get("image")?.setValue(event.file)

    }

   
  }
  onSubmit(): void {

    if (this.unitForm.valid) {
      const valueForm=this.unitForm.value
      const NewUnit:UpdateUnitsDTO={
        id:this.unitId,
        serviceUnits:this.services.value.map((e:any)=>({
          id:e.id,
          text:e.service
        })) as ServiceUnit[],
        status:valueForm.status,
        Longitude:this.center.lng,
        latitude:this.center.lat,
        nameLocation:valueForm.NameLocation,
        projectId:this.unitId,
        title:valueForm.title,
        description:valueForm.description,
        image:this.isMainImageChange?valueForm.image:null,
        codeUnit:valueForm.codeUnit,
        area: valueForm.area,
        numberBathroom:valueForm.numberBathroom,
        numberRoom:valueForm.numberRoom,
        yearOfBuild:valueForm.yearOfBuild,
        price:valueForm.price,
        isShown:valueForm.isShown,
        videoUrl:this.extractYouTubeSrc(valueForm.videoUrl)||"",
        typePrice:valueForm.typePrice=="Available"?'مقدم':'تقسيط',
        unitImages: this.detailImages.value
            .filter((e: UnitImageDTO) => e.id <= 0)
            .map((e: UnitImageDTO) => ({
              id: e.id,
              image: e.image
            })) as UnitImageDTO[],
        advantageUnits:this.advantages.value.map((e:any)=>({
          id:e.id,
          text:e.advantage
        })) as AdvantageUnit[],
        AllRemovedAdvantage:this.AdvantageIdRemoved,
        AllRemovedServices:this.ServiceIdRemoved,
        AllRemovedImages:this.ImagesIdRemoved
      }
     
      this.UnitService.UpdateUnit(NewUnit)
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.editor.destroy()
  }
}
