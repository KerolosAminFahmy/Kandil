import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MediaService } from '../../../../../shared/Services/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaDTO } from '../../../../../shared/Models/model';
import { ImageUploadComponent } from '../../../../../shared/image-upload/image-upload.component';
import { environment } from '../../../../../environments/environment';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-edit-media',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgxEditorModule,ImageUploadComponent],
  templateUrl: './edit-media.component.html',
  styleUrl: './edit-media.component.css'
})
export class EditMediaComponent {
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
  isInitForm:boolean=false;
  mediaForm!: FormGroup;
  selectedImage: File | null = null;
  previewImage: string | null = null;
  previewNameImage: string | undefined = "";
  mediaId!: number;
  ImagesIdRemoved:Array<number>=[];
  apiUrl:string=`${environment.apiUrl}/Media/GetImage/`;
  isFormInit:boolean=false;
  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editor=new Editor();
  }

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
      detailImages: this.fb.array([])

    });
  }

  get detailImages(): FormArray {
    return this.mediaForm.get('detailImages') as FormArray;
  }
  addInitDetailImage(image:string,id:number): void {
    const ImageGroup = this.fb.group({
      image: [image, Validators.required],
      id:[id]
    });
    this.detailImages.push(ImageGroup);
  }
  addDetailImage(): void {
    const ImageGroup = this.fb.group({
      image: [null, Validators.required],
      id:[0]
    });
    this.detailImages.push(ImageGroup);
  }
  removeDetailImage(index: number): void {
    if(this.detailImages.at(index).value.id>0){
      this.ImagesIdRemoved.push(this.detailImages.at(index).value.id)
    }
    this.detailImages.removeAt(index);
  }
  onFileChange(event: { file: File | null}, index: number) {
    
    if (event.file) {
      
      this.detailImages.at(index).get('image')?.setValue(event.file);
      this.detailImages.at(index).get('image')?.markAsTouched()
    }

   
  }
  loadMedia(): void {
    this.mediaService.getById(this.mediaId).subscribe((media) => {
      this.mediaForm.patchValue({
        title: media.title,
        description: media.description,
        videoUrl: media.videoURl,
        created: new Date(media.created).toISOString().split('T')[0],
        
      });
      this.mediaService.GetAllImages(this.mediaId).subscribe((data)=>{
        data.forEach((e)=>{
          this.addInitDetailImage(e.imageName,e.id)
        })
        this.isFormInit=true;
      })
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
        detailImages: this.detailImages.value
            .filter((e:any) => e.id <= 0)
            .map((e:any) => {
               return e.image
          }) as File[],
        image: this.selectedImage || undefined,
        id: this.mediaId,
        AllRemovedImages:this.ImagesIdRemoved,
      };
      this.mediaService.update(this.mediaId, formData);
    } else {
      console.error('Form is invalid');
    }
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
