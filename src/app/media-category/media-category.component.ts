import { Component } from '@angular/core';
import { MediaCategory, projectCategory } from '../../shared/Models/model';
import { CardComponent } from '../../shared/Component/card/card.component';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { CommonModule } from '@angular/common';
import { MediaCategoryService } from '../../shared/Services/media-category.service';
import { environment } from '../../environments/environment';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-category',
  standalone: true,
  imports: [CardComponent, TitleNavigationComponent, CommonModule, PageNotFoundComponent],
  templateUrl: './media-category.component.html',
  styleUrl: './media-category.component.css'
})
export class MediaCategoryComponent {
  ImageUrl:string=environment.apiImage
  private subscriptions: Subscription = new Subscription();

  AllMediaCategory: MediaCategory[] = [
    
  ];
  constructor(private MediaCategory:MediaCategoryService){}

  ngOnInit(): void {
    this.MediaCategory.fetchCities();
    const Sub = this.MediaCategory.MediaCategory$.subscribe((data)=>{
      this.AllMediaCategory=data
    })
    this.subscriptions.add(Sub);

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
