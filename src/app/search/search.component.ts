import { Component } from '@angular/core';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { Units } from '../../shared/Models/model';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UnitManageService } from '../../shared/Services/unit-manage.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TitleNavigationComponent,CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
AllUnit:Units[]=[];
  areaId:number=0;
  imageApi:string=environment.apiImage;
  constructor(private route :ActivatedRoute,private unitService : UnitManageService ){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.areaId = +params['AreaId'];
      console.log(this.areaId)
      this.unitService.search(this.areaId).subscribe((data)=>{
        console.log(data)
        this.AllUnit=data
      })
    });
   
  }
}
