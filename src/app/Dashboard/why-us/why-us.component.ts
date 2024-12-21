import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { WhyusService } from '../../../shared/Services/whyus.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ImageUploadComponent } from "../../../shared/image-upload/image-upload.component";
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../../shared/Services/toast.service';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, EditorComponent, ImageUploadComponent],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css'
})
export class WhyUsManageComponent {
  apikey:string=environment.apiKey;
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
  Massege = inject(ToastService) 
  
  whyUsItems: any[] = [];
  forms: FormGroup[] = [];
  imageForm!:FormGroup
  isMainImageChange:boolean=false;
  apiUrl:string=environment.apiUrl
  constructor(private whyUsService: WhyusService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    
    this.whyUsService.getAll().subscribe((data: any) => {
      this.imageForm= this.fb.group({
        image:[data[0].imageUrl,Validators.required]
      })
      this.whyUsItems = data;
      this.forms = this.whyUsItems.map((item) =>
        this.fb.group({
          id: [item.id],
          title: [{ value: item.title, disabled: true }], 
          description: [item.description,Validators.required],
        })
      );
    });
  }

  onImageChange(event: { file: File | null}, index: number) {
    if (this.imageForm.get('image')?.value !== null && 
      typeof this.imageForm.get('image')?.value === 'object' && !Array.isArray(this.imageForm.get('image')?.value)) {
        this.isMainImageChange=true;
      }
    if (event.file){
      this.imageForm.patchValue({ image: event.file });

    }
  }

  saveChanges(index: number) {
    const form = this.forms[index];
    console.log(form.value)
    const formData = new FormData();

    formData.append('id', form.value.id);
    formData.append('title',form.value.title)
    formData.append('description', form.value.description);

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
