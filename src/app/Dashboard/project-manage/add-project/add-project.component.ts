import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { AdvantageProjectDTO, LocationProjectDTO, ProjectDTO } from '../../../../shared/Models/model';
import { ProjectService } from '../../../../shared/Services/project.service';
import { ActivatedRoute } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgxEditorModule,NgxExtendedPdfViewerModule ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
  encapsulation: ViewEncapsulation.None

})
export class AddProjectComponent {
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
  projectForm: FormGroup;
  areaId:number=0;
  maxLocations = 3;
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,private projectService:ProjectService,private route :ActivatedRoute) {
    this.editor=new Editor()
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      mainImage: [null, [Validators.required]],
      pdfFile: [null],
      videoUrl: [''],
      aboutProject: [''],
      advantageProjects: this.fb.array([]),
      locationImage : [null],
      isFinish:[false,Validators.required],
      locationProjects: this.fb.array([]),
      imageSlider : this.fb.array([])
    });
  }
  ngOnInit(): void {
    const paramSub = this.route.params.subscribe(params => {
      this.areaId = +params['areaId']; 
    });
    this.subscriptions.add(paramSub);

  }
  // Getter for Advantage Projects
  get advantageProjects() {
    return this.projectForm.get('advantageProjects') as FormArray;
  }
  get imageSlider(){
    return this.projectForm.get("imageSlider") as FormArray;
  }
  // Getter for Location Projects
  get locationProjects() {
    return this.projectForm.get('locationProjects') as FormArray;
  }
  extractYouTubeSrc(embedCode: string): string | null {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }
  // Add Advantage
  addAdvantage() {
    const advantageGroup = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(15)]],
      image: [null, [Validators.required]]
    });
    this.advantageProjects.push(advantageGroup);
  }
  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file && index>-1) {
      this.advantageProjects.at(index).get('image')?.setValue(file);
      this.advantageProjects.at(index).get('image')?.markAsTouched()
    }else if(file && index===-1){
      this.projectForm.patchValue({
        mainImage:file
      })
      this.projectForm.get('mainImage')?.markAsTouched()
    }else if(file && index===-2){
      this.projectForm.patchValue({
        locationImage:file
      })
      this.projectForm.get('locationImage')?.markAsTouched()


    }
  }
  onFileChangeSilder(event: any, index: number) {
    const file = event.target.files[0];
    if (file && index>-1) {
      this.imageSlider.at(index).get('image')?.setValue(file);
      this.imageSlider.at(index).get('image')?.markAsTouched()
    }
  }
  onclickInputFile(index: number){
    if(index>-1){
      this.projectForm.get('image')?.markAsTouched()

    }else if(index===-1){
      this.projectForm.get('mainImage')?.markAsTouched()

    }

    else if(index===-2){
      this.projectForm.get('locationImage')?.markAsTouched()

    }
  }
  // Remove Advantage
  removeAdvantage(index: number) {
    this.advantageProjects.removeAt(index);
  }
  addImage(){
    const imageGroup = this.fb.group({
      image:[null,Validators.required]
    }) 
    this.imageSlider.push(imageGroup)
  }
  removeImage(index:number){
    this.imageSlider.removeAt(index);
  }
  // Add Location
  addLocation() {
    if (this.locationProjects.length < this.maxLocations) {
      const locationGroup = this.fb.group({
        time: [null, [Validators.required]],
        street: ['', [Validators.required]]
      });
      this.locationProjects.push(locationGroup);
    }
  }

  // Remove Location
  removeLocation(index: number) {
    this.locationProjects.removeAt(index);
  }

  // Submit Form
  submitForm() {
    if (this.projectForm.valid) {
      const ProjectForm = this.projectForm.value;
      const project: ProjectDTO = {
        title: ProjectForm.title,
        pdfFile:ProjectForm.pdfFile,
        aboutProject: ProjectForm.aboutProject,
        videoUrl: this.extractYouTubeSrc(ProjectForm.videoUrl) || '',
        mainImage: ProjectForm.mainImage,
        isFinish: ProjectForm.isFinish,
        locationImage: ProjectForm.locationImage,
        detailImage: this.imageSlider.value.map((file:any)=>{
          return file.image
        }),
        areaId: this.areaId,
        advantageProjects: this.advantageProjects.value.map((item: any) => ({
          text: item.text,
          image: item.image,
        })) as AdvantageProjectDTO[],
        locationProjects: this.locationProjects.value.map((item: any) => ({
          time: item.time,
          street: item.street,
        })) as LocationProjectDTO[],
      };
      this.projectService.AddProject(project)
      
    } else {
      console.log('Invalid Form');
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.projectForm.get("pdfFile")?.markAsTouched()
     
    if (input.files && input.files.length > 0) {
      this.projectForm.get("pdfFile")?.setValue(input.files[0])
      this.projectForm.get("pdfFile")?.markAsTouched()
     
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.editor.destroy()
  }
}
