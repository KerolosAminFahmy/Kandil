import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { WhyusService } from '../../../shared/Services/whyus.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ImageUploadComponent } from "../../../shared/image-upload/image-upload.component";
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../../shared/Services/toast.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule, ImageUploadComponent,NgxEditorModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css'
})
export class WhyUsManageComponent {

  editor: Editor[]=[];
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
  Massege = inject(ToastService) 
  private subscriptions: Subscription = new Subscription();
  images:Array<string>=[];
  whyUsItems: any[] = [];
  forms: FormGroup[] = [];
  imageForm!:FormGroup
  isMainImageChange:boolean=false;
  apiUrl:string=environment.apiUrl
  constructor(private whyUsService: WhyusService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    
    const Sub = this.whyUsService.getAll().subscribe((data: any) => {
      this.imageForm= this.fb.group({
        image:[data[0].imageUrl,Validators.required]
      })
      this.whyUsItems = data;
      this.forms = this.whyUsItems.map((item,index) =>{
      this.editor.push(new Editor());
      this.editor.push(new Editor());
       return index === 0 ?
        this.fb.group({
          id: [item.id],
          title: [{ value: item.title, disabled: true }], 
          description: [item.description,Validators.required],
        }):this.fb.group({
          id: [item.id],
          title: [{ value: item.title, disabled: true }], 
          description: [item.description,Validators.required],
          fullDescription: [item.fullDescription,Validators.required],
          quote:[item.quote,Validators.required],
          image:[item.imageUrl,Validators.required]
        })
    });
      
    });
    this.subscriptions.add(Sub);

  }

  onImageChange(event: { file: File | null}, index: number) {
    if(index===0){
      if (this.imageForm.get('image')?.value !== null && 
      typeof this.imageForm.get('image')?.value === 'object' && !Array.isArray(this.imageForm.get('image')?.value)) {
        this.isMainImageChange=true;
      }
      if (event.file){
        this.imageForm.patchValue({ image: event.file });

      }
    }else{
      this.forms.at(index)?.patchValue({image:event.file})
    }
    
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.editor.forEach((ele)=>{
      ele.destroy()
    });

  }
  saveChanges(index: number) {
    const form = this.forms[index];
    const formData = new FormData();

    formData.append('id', form.value.id);
    formData.append('title',form.value.title)
    formData.append('description', form.value.description);
    formData.append('fullDescription', form.value.fullDescription);
    formData.append('quote', form.value.quote);
    if (form.get('image')?.value !== null && 
    typeof form.get('image')?.value === 'object' && !Array.isArray(form.get('image')?.value)) {
      formData.append('imageFile', form.value.image);

    }
    this.whyUsService.update(form.value.id, formData).subscribe(() => {
      this.Massege.showMessage("success","نجاح","تم اضافه الوصف بنجاح")
      this.loadItems();
    });
  }
  saveImage(){
    const formData = new FormData();
    if(this.isMainImageChange && this.imageForm.get("image")!=null && this.imageForm.get("image")?.value!=''){
      formData.append('formFile', this.imageForm.get("image")?.value);
      this.whyUsService.updateImage(formData).subscribe(()=>{

      })
    } 
  }
}
