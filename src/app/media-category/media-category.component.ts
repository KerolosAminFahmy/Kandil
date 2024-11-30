import { Component } from '@angular/core';
import { MediaCategory, projectCategory } from '../../shared/Models/model';
import { CardComponent } from '../../shared/Component/card/card.component';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { CommonModule } from '@angular/common';
import { MediaCategoryService } from '../../shared/Services/media-category.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-media-category',
  standalone: true,
  imports: [CardComponent, TitleNavigationComponent,CommonModule],
  templateUrl: './media-category.component.html',
  styleUrl: './media-category.component.css'
})
export class MediaCategoryComponent {
  ImageUrl:string=environment.apiImage

  AllMediaCategory: MediaCategory[] = [
    
  ];
  constructor(private MediaCategory:MediaCategoryService){}

  ngOnInit(): void {
    this.MediaCategory.fetchCities();
    this.MediaCategory.MediaCategory$.subscribe((data)=>{
      this.AllMediaCategory=data
    })
    
  }
}
