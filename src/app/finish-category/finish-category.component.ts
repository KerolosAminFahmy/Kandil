import { Component } from '@angular/core';
import { CardComponent } from "../../shared/Component/card/card.component";
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { FinishCategoryDTO, projectCategory } from '../../shared/Models/model';
import { FinishCategoryService } from '../../shared/Services/finish-category.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

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
  private subscriptions: Subscription = new Subscription();

  constructor(private FinishCategory:FinishCategoryService){}
  ngOnInit(): void {
    const Sub = this.FinishCategory.getAllFinishCategories().subscribe((data)=>{
      this.items=data
    })
    this.subscriptions.add(Sub);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
