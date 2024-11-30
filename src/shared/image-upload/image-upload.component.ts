import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  imageName = signal('');
  fileSize = signal(0);
  uploadProgress = signal(0);
  imagePreview = signal('');
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  @Output() imageSelected = new EventEmitter<{ file: File | null}>();
  @Input() Url:string="";
  @Input() nameImage:string="";
  @Input() IsUpdate:string="";
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    if(this.Url!==""){

      this.fetchImage(this.Url,this.nameImage)
    }
    
  }
  // Handler for file input change
  onFileChange(event: any): void {

    if(this.IsUpdate==="true"){
      alert("To update the image, please remove the current image and upload a new one.");
      return
    }else{
      const file = event.target.files[0] as File | null;
      this.uploadFile(file);
    }
    
  }

  // Handler for file drop
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0] as File | null;
    this.uploadFile(file);
  }

  // Prevent default dragover behavior
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  private emitImageDetails(file: File | null): void {
    this.imageSelected.emit({file});
  }
  // Method to handle file upload
  uploadFile(file: File | null): void {
    if(this.IsUpdate=="true"){
      alert("To update the image, please remove the current image and upload a new one.");
      return
    }
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.fileSize.set(Math.round(file.size / 1024)); // Set file size in KB

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview.set(e.target?.result as string); // Set image preview URL
        this.emitImageDetails(file); // Emit the file and preview

      };
      reader.readAsDataURL(file);

      this.uploadSuccess = true;
      this.uploadError = false;
      this.imageName.set(file.name); // Set image name
    } else {
      this.uploadSuccess = false;
      this.uploadError = true;
      // this.snackBar.open('Only image files are supported!', 'Close', {
      //   duration: 3000,
      //   panelClass: 'error',
      // });
    }
  }

  // Method to remove the uploaded image
  removeImage(): void {
    this.selectedFile = null;
    this.imageName.set('');
    this.fileSize.set(0);
    this.imagePreview.set('');
    this.uploadSuccess = false;
    this.uploadError = false;
    this.uploadProgress.set(0);
    this.emitImageDetails(null);
  }
  fetchImage(url: string,name:string): void {

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const file = new File([blob], name, { type: blob.type });
        this.selectedFile = file;
        this.fileSize.set(Math.round(file.size / 1024)); // Set file size in KB

        // Create preview
        const objectURL = URL.createObjectURL(blob);
        this.imagePreview.set(objectURL);
        this.imageName.set(file.name);
        this.uploadSuccess = true;
        this.uploadError = false;

        // Emit the file and preview
        this.emitImageDetails(file);
      },
      error: () => {
        this.uploadSuccess = false;
        this.uploadError = true;
      },
    });
  }
}
