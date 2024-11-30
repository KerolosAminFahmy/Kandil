import { Component, EventEmitter, Output } from '@angular/core';
import { TitleNavigationComponent } from "../../shared/Component/title-navigation/title-navigation.component";
import { City, projectCategory } from '../../shared/Models/model';
import { CardComponent } from "../../shared/Component/card/card.component";
import { CommonModule } from '@angular/common';
import { CityService } from '../../shared/Services/city.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-project-category',
  standalone: true,
  imports: [TitleNavigationComponent, CardComponent,CommonModule],
  templateUrl: './project-category.component.html',
  styleUrl: './project-category.component.css'
})
export class ProjectCategoryComponent {
  ImageUrl:string=environment.apiImage

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
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  projectCategories: City[] = [
  ];
}
