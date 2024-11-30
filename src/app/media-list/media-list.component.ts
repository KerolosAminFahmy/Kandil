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

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [TitleNavigationComponent,CardComponent,CommonModule],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.css'
})
export class MediaListComponent {
  ImageUrl:string=environment.apiImage

  Title:string|null="";
  LoadedData!:MediaDTO[];

  breadcrumbs: { name: string; url: string }[] = [];
  MediaCategoryId:number=0;
  constructor(private route: ActivatedRoute,private MediaService:MediaService,private MediaCategoryService:MediaCategoryService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['mediaId'] 
      this.MediaCategoryId=id
    });
    this.MediaCategoryService.getById(this.MediaCategoryId).subscribe((name)=>{
      this.Title = name.message
    })
    this.MediaService.getByMediaCategory(this.MediaCategoryId)
    this.MediaService.Media$.subscribe((data)=>{
      this.LoadedData=data
    })
    this.breadcrumbs.push(
      {name:"المركز الإعلامي",url:"/mediaCategories"}
    )
  }
}
