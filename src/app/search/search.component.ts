import { Component } from '@angular/core';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { Units } from '../../shared/Models/model';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UnitManageService } from '../../shared/Services/unit-manage.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { Subscription } from 'rxjs';
import { SkeletonCardComponent } from '../../shared/Component/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TitleNavigationComponent,CommonModule,RouterLink,PageNotFoundComponent,SkeletonCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
AllUnit:Units[]=[];
  areaId:number=0;
  imageApi:string=environment.apiImage;
  private subscriptions: Subscription = new Subscription();
  skeletonArray = Array(3);
  isLoading = true;
  constructor(private route :ActivatedRoute,private unitService : UnitManageService ){}
  ngOnInit(): void {
    const paramSub = this.route.params.subscribe(params => {
      this.areaId = +params['AreaId'];
      const Sub = this.unitService.search(this.areaId).subscribe((data)=>{
        this.AllUnit=data
        setTimeout(()=>{

          this.isLoading=false
        },500)
      })
      this.subscriptions.add(Sub);
    });
    this.subscriptions.add(paramSub);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
