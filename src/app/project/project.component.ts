import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ViewProject } from '../../shared/Models/model';
import { CommonModule } from '@angular/common';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { CardComponent } from '../../shared/Component/card/card.component';
import { ProjectService } from '../../shared/Services/project.service';
import { environment } from '../../environments/environment';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { Subscription } from 'rxjs';
import { SkeletonCardComponent } from '../../shared/Component/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, TitleNavigationComponent, CardComponent, PageNotFoundComponent,SkeletonCardComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  ImageUrl:string=environment.apiImage
  private subscriptions: Subscription = new Subscription();
  skeletonArray = Array(3);
  isLoading = true;
  LoadedData!:ViewProject[];
  Title:string|null="";
  areaId:number=0;
  projectId:number=0;
  breadcrumbs: { name: string; url: string }[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}
  ngOnInit(): void {
  
    const paramSub = this.route.params.subscribe(params => {
      this.breadcrumbs=[]
      this.areaId= +params['projectId'];
      this.projectId= +params['categoryId'];
      const Sub = this.projectService.GetAllProjectByArea(this.areaId).subscribe((data)=>{
        this.LoadedData=data
        setTimeout(()=>{

          this.isLoading=false
        },500)
      })
      this.subscriptions.add(Sub);

      this.breadcrumbs.push(
        {name:"اقسام المشاريع",url:"/projectcategory"}
      )
      this.projectService.getById(this.projectId).subscribe(data=>{
        this.breadcrumbs.push(
          {name:data.message,url:"/projectcategory/"+this.projectId.toString()}
        )
      })
      this.projectService.getNameById(this.areaId).subscribe(data=>{
        this.Title = data.message
  
      })
    });
    
    this.subscriptions.add(paramSub);

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    
  }
}
