import { Component } from '@angular/core';
import { Units } from '../../shared/Models/model';
import { environment } from '../../environments/environment';
import { UnitManageService } from '../../shared/Services/unit-manage.service';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-paid-unit',
  standalone: true,
  imports: [TitleNavigationComponent,CommonModule,RouterLink],
  templateUrl: './all-paid-unit.component.html',
  styleUrl: './all-paid-unit.component.css'
})
export class AllPaidUnitComponent {
  AllUnit:Units[]=[];
  imageApi:string=environment.apiImage;
  constructor(private UnitServices:UnitManageService){}
    ngOnInit(): void {
      
      this.UnitServices.FetchAllPaid().subscribe((data)=>{
        this.AllUnit=data
      })
      
    }
}
