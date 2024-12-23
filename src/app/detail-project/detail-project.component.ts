import { Component } from '@angular/core';
import { TitleNavigationComponent } from "../../shared/Component/title-navigation/title-navigation.component";
import { SliderImageComponent } from "../../shared/Component/slider-image/slider-image.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../shared/Services/project.service';
import { Units, ViewUpdateDTO } from '../../shared/Models/model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { UnitManageService } from '../../shared/Services/unit-manage.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-detail-project',
  standalone: true,
  imports: [TitleNavigationComponent, SliderImageComponent,CommonModule,RouterLink,NgxExtendedPdfViewerModule],
  templateUrl: './detail-project.component.html',
  styleUrl: './detail-project.component.css'
})
export class DetailProjectComponent {
  ImageUrl:string=environment.apiImage
  private subscriptions: Subscription = new Subscription();

  Title:string="";
  project!:ViewUpdateDTO;
  safeUrl:SafeResourceUrl|null="";
  safeContent!: SafeHtml;
  selectedIndex!:number;
  units:Units[]=[];
  breadcrumbs: { name: string; url: string }[] = [];
  projectId:number=0;
  categoryId:number=0;
  areaId:number=0;
  constructor(private route: ActivatedRoute,private unitService:UnitManageService,private projectService:ProjectService,private sanitizer: DomSanitizer) {}
    
    
  ngOnInit(): void {
   
    const paramSub = this.route.params.subscribe((params) => {
      this.projectId = +params['DetailProject'];
      this.categoryId = +params['categoryId'];
      this.areaId= +params['projectId'];

      const Sub = this.projectService.FetchProjectUpdate(this.projectId).subscribe((data)=>{
        this.SafeContent(data.videoURL,data.aboutProject)
        this.project=data
        this.project.images.forEach((e,i)=>{
          this.project.images[i]=this.ImageUrl+"Projects/"+e
        })
        this.subscriptions.add(Sub);
      })

      this.unitService.FetchAllUnit(this.projectId)
      const Sub1 = this.unitService.units$.subscribe((data)=>{
      this.units=data
      this.subscriptions.add(Sub1);

    })
    });
    this.subscriptions.add(paramSub);

    this.breadcrumbs.push(
      {name:"اقسام المشاريع",url:"/projectcategory"}
    )
    const Sub = this.projectService.getById(this.categoryId).subscribe(data=>{
      this.breadcrumbs.push(
        {name:data.message,url:"/projectcategory/"+this.categoryId.toString()}
      )
      this.projectService.getNameById(this.areaId).subscribe(data=>{
        this.breadcrumbs.push(
          {name:data.message,url:`/projectcategory/${this.categoryId}/project/`+this.areaId.toString()}
        )
      })
    })
   
    const Sub1 = this.projectService.getNameProjectById(this.projectId).subscribe(data=>{
      this.Title=data.message
    })
    this.subscriptions.add(Sub);
    this.subscriptions.add(Sub1);

  }
  SafeContent(url:string,description:string){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(description);

  }
  setActiveImage(idx:number){
    this.selectedIndex=idx
  }
  ngAfterViewInit(): void {
    $('.slider-images-slick').slick({
      rtl: true,
      infinite: true,       
      slidesToShow: 2,       
      slidesToScroll: 1,     
      autoplay: true,        
      autoplaySpeed: 2000,   
      arrows: false,          
      dots: true ,  
      prevArrow:'<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: flex;align-content: center;justify-content: center;align-items: center;"></button>' ,         
      nextArrow:'<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: flex;align-content: center;justify-content: center;align-items: center;"></button>',
      responsive: [

            {
                breakpoint: 580,    
                settings: {
                  arrows: false,
                  centerMode: false,
                  centerPadding: "0px",
                  dots: true,
                  slidesToScroll: 1,
                  slidesToShow: 1
                }
            }
        ]
    });
    
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
