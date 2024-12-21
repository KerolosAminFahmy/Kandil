import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { City } from '../../shared/Models/model';
import { CommonModule } from '@angular/common';
import { CityService } from '../../shared/Services/city.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
    AllCity:City[]=[];
  
  constructor(private AreaService:CityService){

  }
  ngOnInit(): void {
    this.AreaService.fetchCities();
    this.AreaService.cities$.subscribe((data)=>{
      this.AllCity=data
    })
  }
}
