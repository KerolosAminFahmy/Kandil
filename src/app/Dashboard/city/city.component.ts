import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUploadComponent } from "../../../shared/image-upload/image-upload.component";
import { CityService } from '../../../shared/Services/city.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddCity, City } from '../../../shared/Models/model';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageUploadComponent,HttpClientModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {
  cities!:City[];
  cityForm: FormGroup;
  isModalOpen:boolean = false;
  isEditMode:boolean = false;
  NameImage:string="";
  @ViewChild('Form') header!: ElementRef;
  UrlEdit:string=""
  ImageUrl:string=environment.apiImage
  private subscriptions: Subscription = new Subscription();

  private cityService = inject(CityService);
  constructor(private fb: FormBuilder) {
    this.cityForm = this.fb.group({
      id : [0],
      name: ['', Validators.required],
      image: [null, Validators.required],
    });
  }
 


  ngOnInit(): void {
    this.cityService.fetchCities()
    const Sub = this.cityService.cities$.subscribe((data)=>{
      
      this.cities=data
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
        const newCity ={
          id: formData.id,
          name: formData.name,
          image: formData.image,
        };
        this.cityService.editCity(formData.id,{
          Title:formData.name,
          image:this.handleImage(formData.image,formData.id)
        })
      }else{
        const newCity ={
          Title: formData.name,
          image: formData.image,
        };
        this.onAdd(newCity)
      }
      this.closeModal();
    }
  }
  handleImage(file: File | null, id: number): File | null {
    for (const ele of this.cities) {
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
    
    this.cities.forEach((ele)=>{
      

       if(ele.id===id){
        this.isEditMode=true
        this.NameImage=ele.imageName
        this.UrlEdit=`${environment.apiUrl}`+"/Cities/"+`${ele.imageName}`
        this.cityForm.patchValue({
          id:ele.id,
          name:ele.name
        })
        this.isModalOpen=true
       }
       
    })
  }

  onDelete(id: number) {
    this.cityService.deleteCity(id).subscribe((data)=>{
    })
  }

  onAdd(AddCity:AddCity) {
    
    this.cityService.addCity(AddCity)
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
