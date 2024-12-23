import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CoverImageService } from '../../../shared/Services/cover-image.service';
import { CommonModule } from '@angular/common';
import { CoverImage } from '../../../shared/Models/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cover-image',
  standalone: true,
  imports: [  CommonModule ,ReactiveFormsModule],
  templateUrl: './cover-image.component.html',
  styleUrl: './cover-image.component.css'
})
export class CoverImageComponent {
  CoverForm: FormGroup;
  isPopupOpen = false;
  selectedFile: File | null = null;
  AllCover :CoverImage[]=[]
  UrlEdit:string=""
  NameImage:string="";
  imgPath:string=environment.apiImage+"Cover/";
  firstTime:boolean=true;
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,private CoverImage : CoverImageService){
     this.CoverForm = this.fb.group({
          id:[0],
          mediaType: ['img', [Validators.required,Validators.pattern(/^(img|video)$/)]], 
          media: [null, Validators.required], 
        });
  }
  ngOnInit(): void {
    this.loadData();
    
  }
  loadData(){
    const Sub = this.CoverImage.getAllCoverImages().subscribe((data)=>{
      this.AllCover=data
    })
    this.subscriptions.add(Sub);

  }
  openPopup(item:CoverImage) {
    this.isPopupOpen = true;
    this.NameImage=item.imageName
    this.UrlEdit=`${environment.apiUrl}`+"/CoverImage/"+`${item.imageName}`
    this.CoverForm.patchValue({
      id:item.id,
      mediaType:item.imageType
    })
  }

  closePopup() {
    this.isPopupOpen = false;
    this.CoverForm.reset(); 
    this.selectedFile = null;
    this.firstTime=true;
  }
  EditCoverItem(){
    if(this.CoverForm.valid){
      const data = this.CoverForm.value
      this.CoverImage.updateCoverImage(data.id,data.mediaType,data.media).subscribe((data)=>{
        this.loadData();
        this.closePopup()
      })

    }
      
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.CoverForm.patchValue({ media: file });
    }
   
  }
  // onImageSelected(event: { file: File | null}): void {
  //   if(!this.firstTime){
      
  //     this.CoverForm.patchValue({ media: event.file });
  //   }else{

  //     this.firstTime=false;
  //   }
  // }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
