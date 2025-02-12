import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { projectCategory, ViewAreaDTO } from '../../shared/Models/model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/Component/card/card.component';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { AreaService } from '../../shared/Services/area.service';
import { environment } from '../../environments/environment';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { Subscription } from 'rxjs';
import { SkeletonCardComponent } from '../../shared/Component/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-porject-area',
  standalone: true,
  imports: [CommonModule, CardComponent, TitleNavigationComponent, PageNotFoundComponent,SkeletonCardComponent],
  templateUrl: './porject-area.component.html',
  styleUrl: './porject-area.component.css'
})
export class PorjectAreaComponent implements OnInit {
  ImageUrl:string=environment.apiImage
  private subscriptions: Subscription = new Subscription();
  skeletonArray = Array(3);
  isLoading = true;
  LoadedData!:ViewAreaDTO[];
  Title:string|undefined="";
  areaId:number=0;
  breadcrumbs: { name: string; url: string }[] = [];

  @Output() dataTitle: EventEmitter<string> = new EventEmitter();

  constructor(private route: ActivatedRoute, private areaService: AreaService) {}
  ngOnInit(): void {
    this.breadcrumbs.push(
      {name:"اقسام المشاريع",url:"/projectcategory"}
    )
    const paramSub = this.route.params.subscribe(params => {
      this.areaId= +params['categoryId'];
      const Sub = this.areaService.fetchUnfinishAreaByCity(this.areaId).subscribe((data)=>{
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
      
      this.dataTitle.emit(this.Title)
    });
    
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
