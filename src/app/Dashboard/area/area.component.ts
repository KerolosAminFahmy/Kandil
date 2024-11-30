import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AllAreaDTO } from '../../../shared/Models/model';
import { AreaService } from '../../../shared/Services/area.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule,ImageUploadComponent,ReactiveFormsModule],
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent {
  areas!:AllAreaDTO[];
  isModalOpen:boolean = false;
  AreaForm: FormGroup;
  isEditMode:boolean = false;
  NameImage:string="";
  UrlEdit:string=""
  ImageUrl:string=environment.apiImage
  constructor(private AreaService:AreaService,private fb: FormBuilder){
    this.AreaForm = this.fb.group({
      id : [0],
      cityId:[0],
      name: ['', Validators.required],
      image: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.AreaService.fetchArea()
    this.AreaService.areas$.subscribe((data)=>{
      this.areas=data
    })
    
  }
  onImageSelected(event: { file: File | null}): void {
    this.AreaForm.patchValue({ image: event.file });
  }
  openAddAreaModal(idCity:number) {
    this.AreaForm.patchValue({
      cityId:idCity
    })
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.UrlEdit="";
    this.isEditMode=false;
    this.AreaForm.reset();
  }
  onSubmit() {
    if (this.AreaForm.valid) {
      const formData = this.AreaForm.value;
      
      if(this.isEditMode){
        this.AreaService.editCity(formData.id,{
          CityId:formData.cityId,
          Name: formData.name,
          Image: this.handleImage(formData.image,formData.cityId,formData.id),
        })
      }else{
        const newArea={
          CityId:formData.cityId,
          Name: formData.name,
          Image: formData.image,
        }
        this.AreaService.AddArea(newArea)
      }
      this.closeModal();
    }
  }
  onDelete(id:number){
    this.AreaService.DeleteArea(id);
  }
  onEdit(areaId:number,cityId:number){
    this.areas.forEach((ele)=>{
      if(ele.id==cityId){
        ele.viewAreas.forEach((area)=>{
          if(area.id==areaId){
            this.isEditMode=true
            this.NameImage=area.imageName
            this.UrlEdit=`${environment.apiUrl}`+"/Cities/"+`${area.imageName}`
            this.AreaForm.patchValue({
              id:areaId,
              cityId:cityId,
              name:area.name,
            })
            this.isModalOpen=true

          }
        })
      }
    })
   
  }
  handleImage(file: File | null,cityId:number ,areaTd: number): File | null {
    for (const ele of this.areas) {
      if (ele.id === cityId) {
        for(const area of ele.viewAreas){
          if(areaTd==area.id){
            return area.imageName === file?.name ? null : file;

          }
        }
      }
    }
    return null; 
  }
}
