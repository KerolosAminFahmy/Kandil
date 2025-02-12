import { Component} from '@angular/core';
import { ProjectService } from '../../../../shared/Services/project.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from "../../../../shared/image-upload/image-upload.component";
import { AdvantageUpdateProject, LocationProject, ProjectUpdateDto } from '../../../../shared/Models/model';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NgxEditorModule, ImageUploadComponent,NgxExtendedPdfViewerModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {
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
  maxLocations = 3;
  areaId:number=0;
  projectId:number=0;
  isFormInitialized = false;
  ListImageAdv:Array<string>=[];
  LocationRemovedId:Array<number>=[];
  advantageRemovedId:Array<number>=[];
  ListImageSlider:Array<string>=[];
  ListRemovedImageSlider:Array<string>=[];
  isMainImageChange:boolean=false;
  isLocationImageChange:boolean=false;
  private subscriptions: Subscription = new Subscription();

  PdfUrl:string="";
  ImageUrl:string=environment.apiImage
  apiUrl:string=environment.apiUrl

  constructor(private fb: FormBuilder,private projectService:ProjectService , private route :ActivatedRoute) {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      mainImage: ['', [Validators.required]],
      pdfFile: [],
      videoUrl: ['', ],
      aboutProject: [''],
      advantageProjects: this.fb.array([]),
      locationImage : [null ],
      locationProjects: this.fb.array([]),
      isFinish:[false],
      imageSlider : this.fb.array([])
    });
    this.editor=new Editor();
  }
  ngOnInit(): void {
    const paramSub = this.route.params.subscribe(params => {
      this.areaId = +params['areaId'];
      this.projectId = +params['projectId'] 
    });
  
    const Sub = this.projectService.FetchProjectUpdate(this.projectId).subscribe((data)=>{
      this.projectForm.patchValue({
        title:data.title,
        mainImage:data.mainImage,
        videoUrl:data.videoURL,
        aboutProject:data.aboutProject,
        locationImage:data.locationImage,
        isFinish:data.isFinish
      })
      this.PdfUrl=data.pdfFile;
      data.advantageProjects.forEach((e)=>{
        
        this.ListImageAdv.push(e.imageUrl)
        this.addInitAdvantage(e.text,null,e.id)
      })
      this.isFormInitialized = true; 

      data.locationProjects.forEach((e)=>{
        this.addInitLocation(e.time,e.nameOfStreet,e.id)
      })
      data.images.forEach((e)=>{
        this.ListImageSlider.push(e)
        this.imageSlider.push(this.fb.group({
          image:[null,Validators.required]
        }) )
      })
    })
    this.subscriptions.add(Sub);
    this.subscriptions.add(paramSub);

  }
   get advantageProjects() {
    return this.projectForm.get('advantageProjects') as FormArray;
  }
  get imageSlider(){
    return this.projectForm.get("imageSlider") as FormArray;
  }
  get locationProjects() {
    return this.projectForm.get('locationProjects') as FormArray;
  }
 

  // Add Advantage
  addInitAdvantage(text : string,file:File|null,id?:number) {
    const advantageGroup = this.fb.group({
      text: [text, [Validators.required, Validators.maxLength(15)]],
      image: [file, [Validators.required]],
      id: [id]
    });
    this.advantageProjects.push(advantageGroup);
  }
  addAdvantage() {
    const advantageGroup = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(15)]],
      image: [null, [Validators.required]],
      id: [0]
    });
    this.advantageProjects.push(advantageGroup);
  }
  onFileChange(event: { file: File | null}, index: number) {
    
    if (event.file && index>-1) {
      
      this.advantageProjects.at(index).get('image')?.setValue(event.file);
      this.advantageProjects.at(index).get('image')?.markAsTouched()
    }else if(event.file && index===-1){
      if (this.projectForm.get('mainImage')?.value !== null && 
      typeof this.projectForm.get('mainImage')?.value === 'object' && !Array.isArray(this.projectForm.get('mainImage')?.value)) {
        this.isMainImageChange=true;
      }
      this.projectForm.patchValue({
        mainImage:event.file
      })
      this.projectForm.get('mainImage')?.markAsTouched()
    }else if(event.file && index===-2){
      if (this.projectForm.get('locationImage')?.value !== null && 
      typeof this.projectForm.get('locationImage')?.value === 'object' && !Array.isArray(this.projectForm.get('locationImage')?.value)) {
        this.isLocationImageChange=true;
      }
      this.projectForm.patchValue({
        locationImage:event.file
      })
      this.projectForm.get('locationImage')?.markAsTouched()
      console.log(this.projectForm.get('locationImage')?.value);


    }
  }
  
  onFileChangeSilder(event: { file: File | null}, index: number) {
    if (event.file && index>-1) {
      this.imageSlider.at(index).get('image')?.setValue(event.file);
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
    if(this.advantageProjects.at(index).value.id>0){

      this.advantageRemovedId.push(this.advantageProjects.at(index).value.id)
    }
    this.advantageProjects.removeAt(index);
    this.ListImageAdv.splice(index, 1);
  }
  addImage(){
    const imageGroup = this.fb.group({
      image:[null,Validators.required]
    }) 
    this.imageSlider.push(imageGroup)
  }
  removeImage(index:number){
    this.imageSlider.removeAt(index);
    if(this.ListImageSlider[index]!==undefined)
    this.ListRemovedImageSlider.push(this.ListImageSlider[index])
    this.ListImageSlider.splice(index, 1);

  }
  // Add Location
  addInitLocation(time:number,street:string,id?:number){
    const locationGroup = this.fb.group({
      time: [time, [Validators.required]],
      street: [street, [Validators.required]],
      id: [id]
    });
    this.locationProjects.push(locationGroup);
  }
  addLocation() {
    if (this.locationProjects.length < this.maxLocations) {
      const locationGroup = this.fb.group({
        time: [null, [Validators.required]],
        street: ['', [Validators.required]],
        id:[0]
      });
      this.locationProjects.push(locationGroup);
    }
  }

  // Remove Location
  removeLocation(index: number) {
    if(this.locationProjects.at(index).value.id>0){

      this.LocationRemovedId.push(this.locationProjects.at(index).value.id)
    }
    this.locationProjects.removeAt(index);
  }
  extractYouTubeSrc(embedCode: string): string | null {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  }
  submitForm() {
    if (this.projectForm.valid) {
      const ProjectForm = this.projectForm.value;
      
      const finalUpdateProject:ProjectUpdateDto={
        title:ProjectForm.title,
        isFinish:ProjectForm.isFinish,
        aboutProject:ProjectForm.aboutProject,
        videoURL:this.extractYouTubeSrc(ProjectForm.videoUrl)||"",
        pdfFile:ProjectForm.pdfFile?ProjectForm.pdfFile:null,
        mainImage:this.isMainImageChange?ProjectForm.mainImage:null,
        locationImage:ProjectForm.locationImage,
        locationRemoveList:this.LocationRemovedId,
        locationProjects:this.locationProjects.value.map((item: any) => ({
          id:item.id,
          time: item.time,
          nameOfStreet: item.street,
        })) as LocationProject[],
        advantageProjects:this.advantageProjects.value.map((item: AdvantageUpdateProject) => ({
          
          id:item.id,
          text: item.text,
          image: item.image,
        })) as AdvantageUpdateProject[],
        advantageRemoveList:this.advantageRemovedId,
        detailImage: this.imageSlider.value.filter((item: File) => {
          return this.ListImageSlider.some((sliderItem: string) => sliderItem === item.name);
        }),
        ListRemovedImage:this.ListRemovedImageSlider,
        projectId:this.projectId
      }
      console.log(finalUpdateProject);
      this.projectService.updateProject(finalUpdateProject)
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
    this.editor.destroy();
  }
}
