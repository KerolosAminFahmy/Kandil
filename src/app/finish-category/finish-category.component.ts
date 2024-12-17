import { Component } from '@angular/core';
import { CardComponent } from "../../shared/Component/card/card.component";
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { FinishCategoryDTO, projectCategory } from '../../shared/Models/model';
import { FinishCategoryService } from '../../shared/Services/finish-category.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-finish-category',
  standalone: true,
  imports: [CardComponent,CommonModule, TitleNavigationComponent],
  templateUrl: './finish-category.component.html',
  styleUrl: './finish-category.component.css'
})
export class FinishCategoryComponent {
  items:FinishCategoryDTO[]=[];
  imageApi:string=environment.apiImage
  constructor(private FinishCategory:FinishCategoryService){}
  ngOnInit(): void {
    this.FinishCategory.getAllFinishCategories().subscribe((data)=>{
      this.items=data
    })
  }
}
