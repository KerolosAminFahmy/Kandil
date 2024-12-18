import { AfterViewInit, Component } from '@angular/core';

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
declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DropdownComponent, UnitComponent,CommonModule,IncreaseNumberDirective,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit  {
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
  constructor(private AreaService:AreaService,
    private SliderService:SliderService,
    private unitService:UnitManageService,
    private FinishCategory:FinishCategoryService){

  }
  ngOnInit(): void {
    this.SliderService.getSliders();
    this.SliderService.sliders$.subscribe((item)=>{
      this.AllSliderItem=item
    })
    this.AreaService.fetchArea();
    this.AreaService.areas$.subscribe((data)=>{
      this.AllArea=data
    })
    this.unitService.FetchAllUnitHome().subscribe((data)=>{
      this.units=data
      this.units.forEach(e=>{
        e.imageName=this.ImageUrl+"Units/"+e.imageName
      })
    })
    this.FinishCategory.getAllFinishCategories().subscribe((data)=>{
      this.FinishCategoryList=data
    })
  }



    ngAfterViewInit(): void {

      setTimeout(()=>{
        $('.slick-slider').slick({
          rtl: true,
          infinite: true,       
          slidesToShow:3,       
          slidesToScroll: 1,     
          autoplay: false,        
          autoplaySpeed: 5000,   
          arrows: false,          
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
      },3500) 
  
    
  
  }

}
