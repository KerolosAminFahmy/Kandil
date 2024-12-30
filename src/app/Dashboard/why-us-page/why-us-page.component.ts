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
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-why-us-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, ImageUploadComponent,NgxEditorModule],
  templateUrl: './why-us-page.component.html',
  styleUrl: './why-us-page.component.css'
})
export class WhyUsPageComponent {
  apiUrl:string=environment.apiUrl;
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
  PageSection:PageSection[]=[];
  Massege = inject(ToastService) 
  private subscriptions: Subscription = new Subscription();
  images:Array<string>=[];
  forms: FormGroup[] = [];
  constructor(private PageSectionService:PageSectionService, private fb: FormBuilder){
   
     
  }
  ngOnInit(): void {
    this.LoadItem();
  }
  LoadItem(){
    this.PageSectionService.getAll().subscribe((data)=>{
      this.PageSection=data;
      this.forms = this.PageSection.map(ele=>{
        this.editor.push(new Editor());
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
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.editor.forEach((ele)=>{
      ele.destroy()
    });
  }
}
