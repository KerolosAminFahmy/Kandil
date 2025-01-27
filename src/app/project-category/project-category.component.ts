import { Component, EventEmitter, Output } from '@angular/core';
import { TitleNavigationComponent } from "../../shared/Component/title-navigation/title-navigation.component";
import { City } from '../../shared/Models/model';
import { CardComponent } from "../../shared/Component/card/card.component";
import { CommonModule } from '@angular/common';
import { CityService } from '../../shared/Services/city.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { SkeletonCardComponent } from '../../shared/Component/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-project-category',
  standalone: true,
  imports: [TitleNavigationComponent, CardComponent, CommonModule, PageNotFoundComponent,SkeletonCardComponent],
  templateUrl: './project-category.component.html',
  styleUrl: './project-category.component.css'
})
export class ProjectCategoryComponent {
  ImageUrl:string=environment.apiImage
  skeletonArray = Array(3);
  isLoading = true;
  @Output() dataTitle: EventEmitter<string> = new EventEmitter();
  constructor(private CityService:CityService){}
  sub!:Subscription;
  ngOnInit(): void {
    this.dataTitle.emit("اقسام المشاريع")
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
  projectCategories: City[] = [
  ];
}
