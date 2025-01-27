import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../shared/Component/card/card.component';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { CityService } from '../../shared/Services/city.service';
import { City } from '../../shared/Models/model';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { SkeletonCardComponent } from '../../shared/Component/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-paid-city',
  standalone: true,
  imports: [TitleNavigationComponent, CardComponent, CommonModule, PageNotFoundComponent,SkeletonCardComponent],
  templateUrl: './paid-city.component.html',
  styleUrl: './paid-city.component.css'
})
export class PaidCityComponent {
  skeletonArray = Array(3);
  isLoading = true;
  constructor(private CityService:CityService){}
  projectCategories: City[] = [
  ];
    ImageUrl:string=environment.apiImage

    sub!:Subscription;

  ngOnInit(): void {
    this.CityService.fetchCities()
    this.sub=this.CityService.cities$.subscribe((data)=>{
      
      this.projectCategories=data
      this.projectCategories.forEach((e)=>{
        e.imageName=this.ImageUrl+e.imageName
      })
      setTimeout(()=>{

        this.isLoading=false
      },500)
    })
    
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
