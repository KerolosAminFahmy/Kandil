import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FinishCategoryDTO } from '../../../shared/Models/model';
import { FinishCategoryService } from '../../../shared/Services/finish-category.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-finish-category-manage',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ImageUploadComponent, RouterLink],
  templateUrl: './finish-category-manage.component.html',
  styleUrl: './finish-category-manage.component.css'
})
export class FinishCategoryManageComponent {
  items:FinishCategoryDTO[]=[];
  isModalOpen:boolean = false;
  isEditMode:boolean = false;
  NameImage:string | undefined ="";
  FinishForm!: FormGroup;
  UrlEdit:string=""
  ImageUrl:string=environment.apiImage

  constructor(private ServiceCategory:FinishCategoryService , private fb :FormBuilder){}
  ngOnInit(): void {
    this.FinishForm = this.fb.group({
          id : [0],
          title: ['', Validators.required],
          image: [null, Validators.required],
        });
    this.ServiceCategory.getAllFinishCategories().subscribe((data)=>{
      this.items=data
    })
  }
  onEdit(id:number | undefined){
  this.items.forEach((ele)=>{
       if(ele.id===id){
        this.isEditMode=true
        this.NameImage=ele.imageName
        this.UrlEdit=`${environment.apiUrl}`+"/FinishCategory/"+`${ele.imageName}`
        this.FinishForm.patchValue({
          id:ele.id,
          title:ele.title
        })
        this.isModalOpen=true
       }
       
    })
  }
  onDelete(id:number | undefined){
    this.ServiceCategory.deleteFinishCategory(id).subscribe(()=>{
      this.items = this.items.filter(item => item.id !== id);
    })
  }
  Add(id:number | undefined){

  }
  closeModal() {
    this.isModalOpen = false;
    this.UrlEdit="";
    this.isEditMode=false;
    this.FinishForm.reset();
  }
  openAddCityModal() {
    
    this.isModalOpen = true;
  }
  onImageSelected(event: { file: File | null}): void {
    this.FinishForm.patchValue({ image: event.file });
  }
  handleImage(file: File | null, id: number): File | null {
    for (const ele of this.items) {
      if (ele.id === id) {
        return ele.imageName === file?.name ? null : file;
      }
    }
    return null; 
  }
  onSubmit(){
 if (this.FinishForm.valid) {
      const formData = this.FinishForm.value;

      if(this.isEditMode){
        const newFinishCategory:FinishCategoryDTO ={
          id: formData.id,
          title: formData.title,
          image: this.handleImage(formData.image,formData.id),
        };
        this.ServiceCategory.updateFinishCategory(formData.id,newFinishCategory).subscribe((data)=>{
          this.items = this.items.map(item =>
            item.id === data.id ? data : item
          );
        })
      }else{
        const newFinishCategory : FinishCategoryDTO ={
          title: formData.title,
          image: formData.image,
        };
        this.onAdd(newFinishCategory)
      }
      this.closeModal();
    }
  }
  onAdd(AddCity:FinishCategoryDTO) {
      
      this.ServiceCategory.addFinishCategory(AddCity).subscribe((data)=>{
        this.items.push(data)
      })
    }
}
