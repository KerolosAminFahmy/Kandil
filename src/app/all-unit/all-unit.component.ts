import { Component } from '@angular/core';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { unit, Units } from '../../shared/Models/model';
import { UnitManageService } from '../../shared/Services/unit-manage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-unit',
  standalone: true,
  imports: [TitleNavigationComponent,CommonModule,RouterLink],
  templateUrl: './all-unit.component.html',
  styleUrl: './all-unit.component.css'
})
export class AllUnitComponent {
  AllUnit:Units[]=[];
  imageApi:string=environment.apiImage;
  private subscriptions: Subscription = new Subscription();

  constructor(private UnitServices:UnitManageService){}
  ngOnInit(): void {
    
    const AllUnitSub = this.UnitServices.GetAllUnits().subscribe((data)=>{
      this.AllUnit=data
    })
    this.subscriptions.add(AllUnitSub);

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
