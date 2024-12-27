import { Component } from '@angular/core';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { CardComponent } from '../../shared/Component/card/card.component';
import { CommonModule } from '@angular/common';
import { MediaCategory, MediaDTO, projectCategory } from '../../shared/Models/model';
import { ActivatedRoute } from '@angular/router';
import { LoadMediaContentService } from '../../shared/Services/load-media-content.service';
import { MediaService } from '../../shared/Services/media.service';
import { MediaCategoryService } from '../../shared/Services/media-category.service';
import { environment } from '../../environments/environment';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [TitleNavigationComponent, CardComponent, CommonModule, PageNotFoundComponent],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.css'
})
export class MediaListComponent {
  ImageUrl:string=environment.apiImage

  Title:string|null="";
  LoadedData!:MediaDTO[];
  private subscriptions: Subscription = new Subscription();

  breadcrumbs: { name: string; url: string }[] = [];
  MediaCategoryId:number=0;
  constructor(private route: ActivatedRoute,private MediaService:MediaService,private MediaCategoryService:MediaCategoryService) {}
  ngOnInit(): void {
    const paramSub = this.route.params.subscribe(params => {
      const id = +params['mediaId'] 
      this.MediaCategoryId=id
      const Sub = this.MediaCategoryService.getById(this.MediaCategoryId).subscribe((name)=>{
        this.Title = name.message
      })
      this.subscriptions.add(Sub);
      this.MediaService.getByMediaCategory(this.MediaCategoryId)
    });
    this.subscriptions.add(paramSub);
    
    const Sub1 = this.MediaService.Media$.subscribe((data)=>{
      this.LoadedData=data
    })
    this.subscriptions.add(Sub1);

    this.breadcrumbs.push(
      {name:"المركز الإعلامي",url:"/mediaCategories"}
    )
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
