import { Component } from '@angular/core';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { unit, Units } from '../../shared/Models/model';
import { UnitManageService } from '../../shared/Services/unit-manage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { SkeletonCardComponent } from '../../shared/Component/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-all-unit',
  standalone: true,
  imports: [TitleNavigationComponent, CommonModule, RouterLink, PageNotFoundComponent,SkeletonCardComponent],
  templateUrl: './all-unit.component.html',
  styleUrl: './all-unit.component.css'
})
export class AllUnitComponent {
  AllUnit:Units[]=[];
  imageApi:string=environment.apiImage;
  private subscriptions: Subscription = new Subscription();
  skeletonArray = Array(3);
  isLoading = true;
  constructor(private UnitServices:UnitManageService){}
  ngOnInit(): void {
    
    const AllUnitSub = this.UnitServices.GetUnits().subscribe((data)=>{
      this.AllUnit=data
      setTimeout(()=>{
        this.isLoading=false
      },500)
    })
    this.subscriptions.add(AllUnitSub);

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
