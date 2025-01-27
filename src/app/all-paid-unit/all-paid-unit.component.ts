import { Component } from '@angular/core';
import { CoverImage, Units } from '../../shared/Models/model';
import { environment } from '../../environments/environment';
import { UnitManageService } from '../../shared/Services/unit-manage.service';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { SkeletonCardComponent } from '../../shared/Component/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-all-paid-unit',
  standalone: true,
  imports: [TitleNavigationComponent, CommonModule, RouterLink, PageNotFoundComponent,SkeletonCardComponent],
  templateUrl: './all-paid-unit.component.html',
  styleUrl: './all-paid-unit.component.css'
})
export class AllPaidUnitComponent {
  AllUnit:Units[]=[];
  imageApi:string=environment.apiImage;
  Cover !: CoverImage;
  private subscriptions: Subscription = new Subscription();
  skeletonArray = Array(3);
  isLoading = true;
  constructor(private UnitServices:UnitManageService){}
    ngOnInit(): void {
      const fetchAllPaidSub = this.UnitServices.FetchAllPaid().subscribe((data)=>{
        this.AllUnit=data
        setTimeout(()=>{
          this.isLoading=false
        },500)
      })
      this.subscriptions.add(fetchAllPaidSub);

    }
    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }
}
