import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City, projectCategory, ViewAreaDTO, ViewProject, ViewProjectDTO } from '../../shared/Models/model';
import { CommonModule } from '@angular/common';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { CardComponent } from '../../shared/Component/card/card.component';
import { ProjectContentService } from '../../shared/Services/project-content.service';
import { AreaService } from '../../shared/Services/area.service';
import { ProjectService } from '../../shared/Services/project.service';
import { environment } from '../../environments/environment';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, TitleNavigationComponent, CardComponent, PageNotFoundComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  ImageUrl:string=environment.apiImage

  LoadedData!:ViewProject[];
  Title:string|null="";
  areaId:number=0;
  projectId:number=0;
  breadcrumbs: { name: string; url: string }[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}
  ngOnInit(): void {
  
    this.route.params.subscribe(params => {
      this.areaId= +params['projectId'];
      this.projectId= +params['categoryId'];


    });
    this.projectService.GetAllProjectByArea(this.areaId).subscribe((data)=>{
      this.LoadedData=data
     
    })
    this.breadcrumbs.push(
      {name:"اقسام المشاريع",url:"/projectcategory"}
    )
    this.projectService.getById(this.projectId).subscribe(data=>{
      this.Title = data.message
      this.breadcrumbs.push(
        {name:data.message,url:"/projectcategory/"+this.projectId.toString()}
      )
    })
    this.projectService.getNameById(this.areaId).subscribe(data=>{
      this.Title = data.message

    })
  }
}
