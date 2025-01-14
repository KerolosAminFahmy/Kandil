import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AllProjectDTO, ProjectDTO, ProjectUpdateDto, ViewProject, ViewProjectDTO, ViewUpdateDTO } from '../Models/model';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  Massege = inject(ToastService) 
  router = inject(Router) 

  //private apiUrl = 'https://localhost:7289/api/Projects/'; // Replace with your API's base URL
  private apiUrl = environment.apiUrl+'/Projects/'; // Replace with your API's base URL
  public ProjectUpdate!:ViewUpdateDTO;
  // BehaviorSubject to store and share city data
  private AreaSubject = new BehaviorSubject<AllProjectDTO[]>([]);
  public areas$ = this.AreaSubject.asObservable();
  constructor(private http: HttpClient) { }
  fetchArea(){
    this.http.get<AllProjectDTO[]>(this.apiUrl+"GetProjectsWithArea").subscribe((data) => {
      this.AreaSubject.next(data);
    });
  }
  getById(id: number):Observable<{message:string}> {
    return this.http.get<{message:string}>(`${this.apiUrl}${"GetCityName/"}${id}`);
  }
  getNameById(id: number):Observable<{message:string}> {
    return this.http.get<{message:string}>(`${this.apiUrl}${"GetAreaName/"}${id}`);
  }
  getNameProjectById(id: number):Observable<{message:string}> {
    return this.http.get<{message:string}>(`${this.apiUrl}${"GetProjectName/"}${id}`);
  }
  fileToBase64Async(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  FetchProjectUpdate(id:number):Observable<ViewUpdateDTO> {
    return this.http.get<ViewUpdateDTO>(this.apiUrl+`${id}`).pipe(
      tap(() => {
      })
    )
  }

  updateProject(UpdatedRecord:ProjectUpdateDto){
    const formData = new FormData();

    formData.append('Title', UpdatedRecord.title);
    formData.append('projectId', UpdatedRecord.projectId.toString());
    formData.append('AboutProject', UpdatedRecord.aboutProject);
    formData.append('VideoURL', UpdatedRecord.videoURL);
  
    if (UpdatedRecord.mainImage) {
      formData.append('MainImage', UpdatedRecord.mainImage);
    }
    if (UpdatedRecord.pdfFile) {
      formData.append('PdfFile', UpdatedRecord.pdfFile);
    }
    if (UpdatedRecord.locationImage) {
      formData.append('LocationImage', UpdatedRecord.locationImage);
    }
  
    UpdatedRecord.locationProjects.forEach((location, index) => {
      formData.append(`LocationProjects[${index}].Id`, location.id.toString());
      formData.append(`LocationProjects[${index}].Time`, location.time.toString());
      formData.append(`LocationProjects[${index}].NameOfStreet`, location.nameOfStreet);
    });
    UpdatedRecord.advantageProjects.forEach((location, index) => {
      formData.append(`advantageUpdates[${index}].Id`, location.id.toString());
      formData.append(`advantageUpdates[${index}].Text`, location.text);
      formData.append(`advantageUpdates[${index}].Image`, location.image);
    });
    UpdatedRecord.advantageRemoveList.forEach((id, index) => {
      formData.append(`AdvantageRemovedList[${index}]`, id.toString());
    });
    UpdatedRecord.locationRemoveList.forEach((id, index) => {
      formData.append(`LocationRemovedList[${index}]`, id.toString());
    });
    UpdatedRecord.detailImage.forEach((file: any, index: number) => {
      formData.append(`images[${index}].Image`, file.image);
      formData.append(`images[${index}].text`, "te");
    });
    UpdatedRecord.ListRemovedImage.forEach((name:string,index:number)=>{
      formData.append(`ImageRemoved[${index}]`, name);

    })
    this.http.put(this.apiUrl, formData).subscribe(
      (data) => {
        this.Massege.showMessage("success","نجاح","تم تحديث المشروع بنجاح")
        this.router.navigate([`/dashboard/Projects`])
      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }
  AddProject(ProjectRecord:ProjectDTO){
      const formData=new FormData();
    ProjectRecord.detailImage.forEach((file: any, index: number) => {
      formData.append(`images[${index}].image`, file);
      formData.append(`images[${index}].text`, "te");
    });
    formData.append('title', ProjectRecord.title);
formData.append('aboutProject', ProjectRecord.aboutProject);
formData.append('videoUrl', ProjectRecord.videoUrl);
formData.append('areaId', ProjectRecord.areaId.toString());

formData.append('mainImage', ProjectRecord.mainImage as Blob);
if(ProjectRecord.pdfFile != null){
  formData.append('pdfFile', ProjectRecord.pdfFile as Blob);

}
formData.append('locationImage', ProjectRecord.locationImage as Blob);


ProjectRecord.advantageProjects.forEach((advantage: any, index: number) => {
  formData.append(`advantageProjects[${index}].text`, advantage.text);
  formData.append(`advantageProjects[${index}].image`, advantage.image);
});

ProjectRecord.locationProjects.forEach((location: any, index: number) => {
  formData.append(`locationProjects[${index}].time`, location.time);
  formData.append(`locationProjects[${index}].street`, location.street);
});
     
    this.http.post<void>(this.apiUrl+"AddProject", formData,
      {
        headers: {
          'enctype': 'multipart/form-data'
        }
      }
    ).subscribe(
      data => {
        this.Massege.showMessage("success","نجاح","تم اضافه المشروع بنجاح")
        this.router.navigate([`/dashboard/Projects`])
      },
      error => {
        console.error('Error adding area:', error);
      }
    );
  }
  DeleteProject(projectId:number,areaId:number){
    this.http.delete<string>(`${this.apiUrl}${projectId}`).subscribe(
      (data) => {
  
        const currentAreas = this.AreaSubject.getValue();
  
        const updatedAreas = currentAreas.map(area => {
          if (area.id === areaId) {
            return {
              ...area,
              viewProject: area.viewProject.filter(area => area.id !== projectId) 
            };
          }
          return area; 
        });
            this.AreaSubject.next(updatedAreas);
            this.Massege.showMessage("success","نجاح","تم حذف المشروع بنجاح")

      },
      (error) => {
        console.error('Error deleting area:', error); 
      }
  )
  }
  GetAllProjectByArea(id:number):Observable<ViewProject[]>{
    return this.http.get<ViewProject[]>(this.apiUrl+"GetAllProjectByArea/"+id).pipe(
      tap(() => {
      })
    )
  }
  GetAllPaidProjectByArea(id:number):Observable<ViewProject[]>{
    return this.http.get<ViewProject[]>(this.apiUrl+"GetAllPaidProjectByArea/"+id).pipe(
      tap(() => {
      })
    )
  }
}
