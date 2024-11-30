import { Component } from '@angular/core';
import { TitleNavigationComponent } from "../../shared/Component/title-navigation/title-navigation.component";
import { SliderImageComponent } from "../../shared/Component/slider-image/slider-image.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadMediaContentService } from '../../shared/Services/load-media-content.service';
import { CommonModule } from '@angular/common';
import { Media, MediaDTO } from '../../shared/Models/model';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { MediaService } from '../../shared/Services/media.service';
import { CustomDatePipe } from '../../shared/Pipes/custom-date.pipe';
import { MediaCategoryService } from '../../shared/Services/media-category.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detail-media',
  standalone: true,
  imports: [TitleNavigationComponent, SliderImageComponent ,CommonModule,RouterLink,CustomDatePipe],
  templateUrl: './detail-media.component.html',
  styleUrl: './detail-media.component.css'
})
export class DetailMediaComponent {
  LoadedData!:MediaDTO;
  safeUrl!: SafeResourceUrl|null;
  safeContent!: SafeHtml;
  LoadedImage:string[]=[];
  title:string="";
  IdMedia:number=0;
  NameMedia:string="";
  ImageUrl:string=environment.apiImage

  breadcrumbs: { name: string; url: string }[] = [];

  constructor(private route: ActivatedRoute,private mediaService: 
    MediaService,private sanitizer: DomSanitizer,private mediaCategory : MediaCategoryService) {
   
    
    
    
  }
  ngOnInit(): void {
   
    this.route.params.subscribe((params) => {
      const id = +params['DetailId'];
      this.IdMedia = +params['mediaId'] 

      this.mediaService.getById(id).subscribe((media) => {
        this.LoadedData=media
        this.title=media.title
        this.SafeContent(media.videoURl,media.description)
      });
    });
    this.breadcrumbs.push(
      {name:"المركز الإعلامي",url:"/mediaCategories"}
    )
    this.mediaCategory.getById(this.IdMedia).subscribe(data=>{
      this.NameMedia = data.message
      this.breadcrumbs.push(
        {name:data.message,url:"/mediaCategories/"+this.IdMedia.toString()}
      )
    })
   
  }
  SafeContent(url:string,description:string){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(description);
  }
  
}
