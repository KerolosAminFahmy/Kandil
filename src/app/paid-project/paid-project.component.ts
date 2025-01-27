import { Component } from '@angular/core';
import { ViewProject } from '../../shared/Models/model';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../shared/Services/project.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/Component/card/card.component';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SkeletonCardComponent } from '../../shared/Component/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-paid-project',
  standalone: true,
  imports: [CommonModule, TitleNavigationComponent, CardComponent, PageNotFoundComponent,SkeletonCardComponent],
  templateUrl: './paid-project.component.html',
  styleUrl: './paid-project.component.css'
})
export class PaidProjectComponent {
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
    this.breadcrumbs.push(
      {name:"سابقة الاعمال",url:"/comprojects"}
    )
    const paramSub = this.route.params.subscribe(params => {
      this.areaId= +params['projectId'];
      this.projectId= +params['categoryId'];
      const Sub = this.projectService.GetAllPaidProjectByArea(this.areaId).subscribe((data)=>{
        this.LoadedData=data
        setTimeout(()=>{

          this.isLoading=false
        },500)
      })
      this.subscriptions.add(Sub);

     
      this.projectService.getById(this.projectId).subscribe(data=>{

        this.breadcrumbs.push(
          {name:data.message,url:"/comprojects/"+this.projectId.toString()}
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
