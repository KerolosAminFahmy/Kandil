import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { ViewAreaDTO } from '../../shared/Models/model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/Component/card/card.component';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from '../../shared/Services/area.service';
import { SkeletonCardComponent } from '../../shared/Component/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-paid-area',
  standalone: true,
  imports: [CommonModule, CardComponent, TitleNavigationComponent, PageNotFoundComponent,SkeletonCardComponent],
  templateUrl: './paid-area.component.html',
  styleUrl: './paid-area.component.css'
})
export class PaidAreaComponent {
  ImageUrl:string=environment.apiImage
  private subscriptions: Subscription = new Subscription();
  skeletonArray = Array(3);
  isLoading = true;
  LoadedData!:ViewAreaDTO[];
  Title:string|undefined="";
  areaId:number=0;
  breadcrumbs: { name: string; url: string }[] = [];
  constructor(private route: ActivatedRoute, private areaService: AreaService) {}
  ngOnInit(): void {
    this.breadcrumbs.push(
      {name:"سابقة الاعمال",url:"/comprojects"}
    )
    const paramSub = this.route.params.subscribe(params => {
      this.areaId= +params['categoryId'];
      const Sub = this.areaService.fetchAreaByCity(this.areaId).subscribe((data)=>{
        this.Title=data.title
        this.LoadedData=data.data
        this.LoadedData.forEach((e)=>{
          e.imageName=this.ImageUrl+e.imageName
        })
        setTimeout(()=>{
          this.isLoading=false
        },500)
        this.subscriptions.add(Sub);

      })
      this.subscriptions.add(paramSub);
          });
    
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
