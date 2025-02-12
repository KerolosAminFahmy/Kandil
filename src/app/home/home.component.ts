import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { DropdownComponent } from "./dropdown/dropdown.component";
import { UnitComponent } from "../unit/unit.component";
import { AllAreaDTO, FinishCategoryDTO, Slider, unit, Units } from '../../shared/Models/model';
import { CommonModule } from '@angular/common';
import { IncreaseNumberDirective } from './directive/increase-number.directive';
import { RouterLink } from '@angular/router';
import { AreaService } from '../../shared/Services/area.service';
import { UnitManageService } from '../../shared/Services/unit-manage.service';
import { environment } from '../../environments/environment';
import { SliderService } from '../../shared/Services/slider.service';
import { FinishCategoryService } from '../../shared/Services/finish-category.service';
import { WhyusService } from '../../shared/Services/whyus.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LoadingPageComponent } from '../loading-page/loading-page.component';
declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DropdownComponent, UnitComponent,CommonModule,IncreaseNumberDirective,RouterLink,LoadingPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit  {
  /* */
  @ViewChild('firstSection', { static: true }) firstSection!: ElementRef;
  @ViewChild('projectArea', { static: true }) projectArea!: ElementRef;
  @ViewChild('VideoArea', { static: true }) VideoArea!: ElementRef;
  @ViewChild('productArea', { static: true }) productArea!: ElementRef;

  isFirstSectionVisible = false;
  isAboutUsSectionVisible = false;
  isProjectArea = false;
  isVideoArea = false;
  isProductArea = false;
  private observeSection(section: ElementRef, callback: (isVisible: boolean) => void): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(section.nativeElement);
  }
  /* */
  @ViewChild('tri', { static: false }) tri!: ElementRef;
  whyId:Array<number>=[];
  ImageUrl:string=environment.apiImage
  unitData: Array<unit> = [
    {
      title: "شقه بـميني كمبوند الفريدة",
      status: "متاح",
      locationText: "التجمع الخامس - الشروق",
      description:"",
      rooms: 3,
      bathroom: 3,
      price: 726600,
      area: 173,
      Location: "https://www.google.com/maps?q=30.033333,31.233334",
      imgPath: "https://kandil-realestate.com/wp-content/uploads/2023/09/timthumb-1.jpeg"
    },
    {
      title: "شقة بمشروع ( B 106 ) | الحي الرابع – بيت الوطن | القاهرة الجديدة",
      status: "متاح",
      locationText: "التجمع الخامس - مدينة نصر",
      description:"",
      rooms: 3,
      bathroom: 3,
      price: 6335000,
      area: 173,
      Location: "https://www.google.com/maps?q=30.033333,31.233334",
      imgPath: "https://kandil-realestate.com/wp-content/uploads/2023/09/timthumb-1.jpeg"
    },
    {
      title: "شقه بـميني كمبوند الفريدة",
      status: "متاح",
      locationText: "- الشروق",
      description:"",
      rooms: 3,
      bathroom: 3,
      price: 726600,
      area: 173,
      Location: "https://www.google.com/maps?q=30.033333,31.233334",
      imgPath: "https://kandil-realestate.com/wp-content/uploads/2023/09/timthumb-1.jpeg"
    }
  ];
  FinishCategoryList:FinishCategoryDTO[]=[];
  AllArea!:AllAreaDTO[];
  AllSliderItem:Slider[]=[];
  units:Units[]=[];
  whyUsItem:SafeHtml[]=[];
  private subscriptions: Subscription = new Subscription();

  ImageWhyUs:string=this.ImageUrl+"WhyUs/"
  constructor(private AreaService:AreaService,
    private SliderService:SliderService,
    private unitService:UnitManageService,
    private FinishCategory:FinishCategoryService,
    private WhyusService:WhyusService,
    private sanitizer: DomSanitizer){

  }
  ngOnInit(): void {
    const Sub = this.SliderService.sliders$.subscribe((item)=>{
      this.AllSliderItem=item
    })
    

    
    const Sub4 = this.FinishCategory.getAllFinishCategories().subscribe((data)=>{
      this.FinishCategoryList=data
    })
    const Sub1 =  this.WhyusService.getAll().subscribe((data: any[])=>{
      data.forEach(e => {
        this.whyId.push(e.id)
        this.whyUsItem.push(this.SafeContent(e.description))
      });
        this.ImageWhyUs+=data[0].imageUrl
    })
    this.subscriptions.add(Sub1);
    this.subscriptions.add(Sub);
    this.subscriptions.add(Sub4);

  }


  SafeContent(description:string):SafeHtml{
    return this.sanitizer.bypassSecurityTrustHtml(description);

  }
    ngAfterViewInit(): void {
      this.observeSection(this.firstSection, (isVisible) => {
        if(!this.isFirstSectionVisible){
          this.isFirstSectionVisible = isVisible;
          this.SliderService.getSliders();
  
        }
      
      });
      this.observeSection(this.productArea, (isVisible) => {
        if(!this.isProductArea){
          const Sub3 = this.unitService.FetchAllUnitHome().subscribe((data)=>{
            this.units=data
            this.isProductArea = true;
  
            this.units.forEach(e=>{
              e.imageName=this.ImageUrl+"Units/"+e.imageName
            })
          })
          this.subscriptions.add(Sub3);
        }
       
      });
      this.observeSection(this.projectArea, (isVisible) => {
        if(!this.isProjectArea){
          const Sub2 = this.AreaService.fetchAvailableArea().subscribe((data)=>{
            this.AllArea=data
            this.isProjectArea = isVisible;
          });

          this.subscriptions.add(Sub2);
        }
       

      });
      this.observeSection(this.VideoArea, (isVisible) => {
        if(!this.isVideoArea)
        this.isVideoArea = isVisible;
      });
  
      setTimeout(()=>{
        $('.slick-slider').slick({
          rtl: true,
          infinite: true,       
          slidesToShow:3,       
          slidesToScroll: 1,     
          autoplay: false,        
          autoplaySpeed: 1000,   
          arrows: true,          
          dots: true , 
          lazyLoad: 'ondemand', 
          prevArrow:'<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: flex;align-content: center;justify-content: center;align-items: center;"></button>' ,         
          nextArrow:'<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: flex;align-content: center;justify-content: center;align-items: center;"></button>',
          responsive: [
          {
                  breakpoint: 992,  
                  settings: {
      
                      slidesToScroll: 1,
                      slidesToShow: 2
                  }
              },
              {
                  breakpoint: 768,  
                  settings: {
                    arrows: false,
                    dots: true,
                    slidesToScroll: 1,
                    slidesToShow: 2
                  }
              },
              {
                  breakpoint: 640,    
                  settings: {
                    arrows: false,
                    dots: true,
                    slidesToScroll: 1,
                    slidesToShow: 1
                  }
              }
            ]
        });
        $('.swiper-wrapper').slick({ 
          rtl: true,
          autoplay: true,
          autoplaySpeed: 8000,
          arrows: true,
          dots: false,
          fade: true,
          cssEase: 'linear',
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          responsive: [
              {
                  breakpoint: 1200,
                  settings: {
                      arrows: false,
                      dots: true,
                  }
              }
          ]
        });
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const video = entry.target as HTMLVideoElement;
              if (entry.isIntersecting) {
                video.play();
              } else {
                video.pause();
              }
            });
          },
          { threshold: 0.5 }
        );
        if(this.tri!=undefined){
const videos = this.tri.nativeElement.querySelectorAll('video');
        videos.forEach((video: HTMLVideoElement) => observer.observe(video));
        }
        
      
      },3000) 
  
    
  
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
