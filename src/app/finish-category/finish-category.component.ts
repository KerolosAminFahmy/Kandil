import { Component } from '@angular/core';
import { CardComponent } from "../../shared/Component/card/card.component";
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { projectCategory } from '../../shared/Models/model';

@Component({
  selector: 'app-finish-category',
  standalone: true,
  imports: [CardComponent, TitleNavigationComponent],
  templateUrl: './finish-category.component.html',
  styleUrl: './finish-category.component.css'
})
export class FinishCategoryComponent {
  
}
