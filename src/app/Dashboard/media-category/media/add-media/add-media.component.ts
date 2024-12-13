import { Component } from '@angular/core';
import { MediaDTO } from '../../../../../shared/Models/model';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MediaService } from '../../../../../shared/Services/media.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-add-media',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,EditorComponent],
  templateUrl: './add-media.component.html',
  styleUrl: './add-media.component.css'
})
export class AddMediaComponent {
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
  mediaForm!: FormGroup;
  selectedImage: File | null = null;
  MediaCategoryId:number=0;
  apikey:string=environment.apiKey;

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.MediaCategoryId = +params['MediaCategoryId'] 
    });
    this.mediaForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required]],
      videoUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.*/)]],
      created: ['', [Validators.required]],
      image: [null,Validators.required],
      detailImages: this.fb.array([])
    });
  }
  get detailImages(): FormArray {
    return this.mediaForm.get('detailImages') as FormArray;
  }
  addDetailImage(): void {
    this.detailImages.push(this.fb.control(null, Validators.required));
  }
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      this.mediaForm.get("image")?.setValue(file);
    }
  }
  onFileSelect(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.detailImages.at(index).setValue(input.files[0]);
    }
  }
  removeDetailImage(index: number): void {
    this.detailImages.removeAt(index);
  }
  onSubmit(): void {
    if (this.mediaForm.valid) {
      const formData: MediaDTO = {
        ...this.mediaForm.value,
        image: this.selectedImage || undefined, 
        mediaId:this.MediaCategoryId,
      };
      this.mediaService.create(formData);
     
    } else {
      console.error('Form is invalid');
    }
  }
}
