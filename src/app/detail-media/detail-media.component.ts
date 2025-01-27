import { Component } from '@angular/core';
import { TitleNavigationComponent } from "../../shared/Component/title-navigation/title-navigation.component";
import { SliderImageComponent } from "../../shared/Component/slider-image/slider-image.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MediaDTO } from '../../shared/Models/model';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { MediaService } from '../../shared/Services/media.service';
import { CustomDatePipe } from '../../shared/Pipes/custom-date.pipe';
import { MediaCategoryService } from '../../shared/Services/media-category.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { SkeletonDetailEventComponent } from '../../shared/Component/skeleton-detail-event/skeleton-detail-event.component';

@Component({
  selector: 'app-detail-media',
  standalone: true,
  imports: [TitleNavigationComponent, SliderImageComponent ,CommonModule,RouterLink,CustomDatePipe,SkeletonDetailEventComponent],
  templateUrl: './detail-media.component.html',
  styleUrl: './detail-media.component.css'
})
export class DetailMediaComponent {
  LoadedData!:MediaDTO;
  safeUrl!: SafeResourceUrl|null;
  safeContent!: SafeHtml;
  LoadedImage:string[]=[];
  isLoading:boolean=true;
  title:string="";
  IdMedia:number=0;
  NameMedia:string="";
  private subscriptions: Subscription = new Subscription();

  ImageUrl:string=environment.apiImage

  breadcrumbs: { name: string; url: string }[] = [];

  constructor(private route: ActivatedRoute,private mediaService: 
    MediaService,private sanitizer: DomSanitizer,private mediaCategory : MediaCategoryService) {
   
    
    
    
  }
  ngOnInit(): void {
   
    const paramSub = this.route.params.subscribe((params) => {
      const id = +params['DetailId'];
      this.IdMedia = +params['mediaId'] 

    const Sub = this.mediaService.getById(id).subscribe((media) => {
        this.LoadedData=media
        this.title=media.title
        this.SafeContent(media.videoURl,media.description)
        setTimeout(()=>{
          this.isLoading=false
        },500)
      });
    this.subscriptions.add(Sub);

    });
    this.breadcrumbs.push(
      {name:"المركز الإعلامي",url:"/mediaCategories"}
    )
    const Sub = this.mediaCategory.getById(this.IdMedia).subscribe(data=>{
      this.NameMedia = data.message
      this.breadcrumbs.push(
        {name:data.message,url:"/mediaCategories/"+this.IdMedia.toString()}
      )
    })
    this.subscriptions.add(Sub);

    this.subscriptions.add(paramSub);

  }
  SafeContent(url:string,description:string){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(description);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
