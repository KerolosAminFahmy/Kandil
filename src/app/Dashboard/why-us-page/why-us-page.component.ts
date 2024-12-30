import { Component, inject } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../shared/Services/toast.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageSection } from '../../../shared/Models/model';
import { PageSectionService } from '../../../shared/Services/page-section.service';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-us-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, EditorComponent, ImageUploadComponent],
  templateUrl: './why-us-page.component.html',
  styleUrl: './why-us-page.component.css'
})
export class WhyUsPageComponent {
  apikey:string=environment.apiKey;
  apiUrl:string=environment.apiUrl
  PageSection:PageSection[]=[];
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
  private subscriptions: Subscription = new Subscription();
  images:Array<string>=[];
  forms: FormGroup[] = [];
  constructor(private PageSectionService:PageSectionService, private fb: FormBuilder){}
  ngOnInit(): void {
    this.LoadItem();
  }
  LoadItem(){
    this.PageSectionService.getAll().subscribe((data)=>{
      console.log(data)
      this.PageSection=data;
      this.forms = this.PageSection.map(ele=>{
        return this.fb.group({
                  id: [ele.id],
                  title: [ele.text], 
                  image: [ele.imageUrl],
                  change:[false]
                })
      })
    })
  }
  onImageChange(event: { file: File | null}, index: number) {
    if (this.forms.at(index)?.get('image')?.value !== null && 
      typeof this.forms.at(index)?.get('image')?.value === 'object' && !Array.isArray(this.forms.at(index)?.get('image')?.value)) {
        this.forms.at(index)?.patchValue({change:true});
      }
      this.forms.at(index)?.patchValue({image:event.file})
  }
  saveChanges(index: number) {
    const form = this.forms[index];
    console.log(form.value)
    const formData = new FormData();

    formData.append('id', form.value.id);
    formData.append('text',form.value.title);
    if (form.get('change')?.value) {
      formData.append('imageFile', form.value.image);
    }
    this.PageSectionService.update(form.value.id, formData).subscribe(() => {
      this.Massege.showMessage("success","نجاح","تم اضافه الوصف بنجاح")
      this.LoadItem();
    });
  }
}
