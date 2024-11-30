import { Component } from '@angular/core';
import { AllProjectDTO } from '../../../shared/Models/model';
import { ProjectService } from '../../../shared/Services/project.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-project-manage',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './project-manage.component.html',
  styleUrl: './project-manage.component.css'
})
export class ProjectManageComponent {
  Projects!:AllProjectDTO[];
  ImageUrl:string=environment.apiImage

  constructor(private projectService:ProjectService,  private router: Router
){
   
  }
  ngOnInit(): void {
    this.projectService.fetchArea()
    this.projectService.areas$.subscribe((data)=>{
      this.Projects=data

    })
    
  }
  AddProject(id:number){
    this.router.navigate([`dashboard/Projects/${id}/add`]);
  }
  onDelete(id:number,areaId:number){
    this.projectService.DeleteProject(id,areaId)
  }
  onEdit(id:number,areaId:number){
    this.router.navigate([`dashboard/Projects/${areaId}/edit/${id}`])
  }
}
