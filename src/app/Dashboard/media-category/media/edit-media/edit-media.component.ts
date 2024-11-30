import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { MediaService } from '../../../../../shared/Services/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaDTO } from '../../../../../shared/Models/model';
import { ImageUploadComponent } from '../../../../../shared/image-upload/image-upload.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-edit-media',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,EditorComponent,ImageUploadComponent],
  templateUrl: './edit-media.component.html',
  styleUrl: './edit-media.component.css'
})
export class EditMediaComponent {
  init: EditorComponent['init'] = {
    plugins: [
      // Core editing features
      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
      // Your account includes a free trial of TinyMCE premium features
      // Try the most popular premium features until Dec 4, 2024:
      'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate',  'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss',
      // // Early access to document converters
      // 'importword', 'exportword', 'exportpdf'
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
  isInitForm:boolean=false;
  mediaForm!: FormGroup;
  selectedImage: File | null = null;
  previewImage: string | null = null;
  previewNameImage: string | undefined = "";
  mediaId!: number;

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mediaId = +params['mediaId'];
      this.loadMedia();
    });

    this.mediaForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required]],
      videoUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.*/)]],
      created: ['', [Validators.required]],
      image: [null],
    });
  }

  loadMedia(): void {
    this.mediaService.getById(this.mediaId).subscribe((media) => {
      this.mediaForm.patchValue({
        title: media.title,
        description: media.description,
        videoUrl: media.videoURl,
        created: new Date(media.created).toISOString().split('T')[0],
        
      });
      this.previewImage = `${environment.apiUrl}/Media/GetImage/${media.imageName}`;
      this.previewNameImage = media.imageName;
      this.isInitForm=true
    });
  }

  onImageSelected(event: {file:File|null}): void {
    if (event.file && event.file.name!==this.previewNameImage) {
      this.selectedImage = event.file;
      
    }
  }

  onSubmit(): void {
    if (this.mediaForm.valid) {
      const formData: MediaDTO = {
        ...this.mediaForm.value,
        image: this.selectedImage || undefined,
        id: this.mediaId,
      };

      this.mediaService.update(this.mediaId, formData);
    } else {
      console.error('Form is invalid');
    }
  }
}
