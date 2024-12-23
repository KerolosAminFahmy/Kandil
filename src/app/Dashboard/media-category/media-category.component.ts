import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddMediaCategory, MediaCategory, MediaCategoryDto, UpdateMediaCategory } from '../../../shared/Models/model';
import { MediaCategoryService } from '../../../shared/Services/media-category.service';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ImageUploadComponent,RouterLink],
  templateUrl: './media-category.component.html',
  styleUrl: './media-category.component.css'
})
export class MediaCategoriesComponent {
  MediaCategory!:MediaCategory[];
  cityForm: FormGroup;
  isModalOpen:boolean = false;
  isEditMode:boolean = false;
  NameImage:string="";
  @ViewChild('Form') header!: ElementRef;
  UrlEdit:string=""
  ImageUrl:string=environment.apiImage
  private subscriptions: Subscription = new Subscription();

  private mediaCategoryService = inject(MediaCategoryService);
  constructor(private fb: FormBuilder) {
    this.cityForm = this.fb.group({
      id : [0],
      title: ['', Validators.required],
      image: [null, Validators.required],
    });
  }
 


  ngOnInit(): void {
    this.mediaCategoryService.fetchCities()
    const Sub = this.mediaCategoryService.MediaCategory$.subscribe((data)=>{
      
      this.MediaCategory=data
    })
    this.subscriptions.add(Sub);

  }
  onImageSelected(event: { file: File | null}): void {
    this.cityForm.patchValue({ image: event.file });
  }
  onSubmit() {
    if (this.cityForm.valid) {
      const formData = this.cityForm.value;
      
      if(this.isEditMode){
        const newCity:UpdateMediaCategory ={
          id: formData.id,
          title: formData.title,
          image: this.handleImage(formData.image,formData.id),
        };
        this.mediaCategoryService.editMediaCategory(formData.id,newCity)
      }else{
        const newCity : AddMediaCategory ={
          title: formData.title,
          image: formData.image,
        };
        this.onAdd(newCity)
      }
      this.closeModal();
    }
  }
  handleImage(file: File | null, id: number): File | null {
    for (const ele of this.MediaCategory) {
      if (ele.id === id) {
        return ele.imageName === file?.name ? null : file;
      }
    }
    return null; 
  }
    
  
  closeModal() {
    this.isModalOpen = false;
    this.UrlEdit="";
    this.isEditMode=false;
    this.cityForm.reset();
  }
  openAddCityModal() {
    
    this.isModalOpen = true;
  }
  onEdit(id:  number) {
    
    this.MediaCategory.forEach((ele)=>{
      

       if(ele.id===id){
        this.isEditMode=true
        this.NameImage=ele.imageName
        this.UrlEdit=`${environment.apiUrl}`+"/MediaCategory/GetImage/"+`${ele.imageName}`
        this.cityForm.patchValue({
          id:ele.id,
          title:ele.title
        })
        this.isModalOpen=true
       }
       
    })
  }

  onDelete(id: number) {
    this.mediaCategoryService.deleteCity(id).subscribe((data)=>{
    })
  }

  onAdd(AddCity:AddMediaCategory) {
    
    this.mediaCategoryService.addMediaCategory(AddCity)
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
