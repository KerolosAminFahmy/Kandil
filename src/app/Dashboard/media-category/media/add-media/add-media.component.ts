import { Component } from '@angular/core';
import { MediaDTO } from '../../../../../shared/Models/model';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MediaService } from '../../../../../shared/Services/media.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-add-media',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgxEditorModule],
  templateUrl: './add-media.component.html',
  styleUrl: './add-media.component.css'
})
export class AddMediaComponent {
  editor: Editor;
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
  mediaForm!: FormGroup;
  selectedImage: File | null = null;
  MediaCategoryId:number=0;

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
    private route:ActivatedRoute
  ) {
    this.editor=new Editor()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.MediaCategoryId = +params['MediaCategoryId'] 
    });
    this.mediaForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required]],
      videoUrl: ['', [Validators.required]],
      created: ['', [Validators.required]],
      image: [null,Validators.required],
      detailImages: this.fb.array([])
    });
  }
  get detailImages(): FormArray {
    return this.mediaForm.get('detailImages') as FormArray;
  }
  extractYouTubeSrc(embedCode: string): string | null {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : null;
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
        videoUrl: this.extractYouTubeSrc(this.mediaForm.value.videoUrl) || undefined,
        image: this.selectedImage || undefined, 
        mediaId:this.MediaCategoryId,
      };
      this.mediaService.create(formData);
     
    } else {
      console.error('Form is invalid');
    }
  }
  ngOnDestroy(): void {
    this.editor.destroy()
  }
}
