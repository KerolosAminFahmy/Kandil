import { Component } from '@angular/core';
import { Units } from '../../../shared/Models/model';
import { UnitManageService } from '../../../shared/Services/unit-manage.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusTranslatePipe } from '../../../shared/Pipes/status-translate.pipe';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [CommonModule,RouterLink,StatusTranslatePipe],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent {
  units:Units[]=[];
  projectId:number=0;
  ImageUrl:string=environment.apiImage

  constructor(private unitService:UnitManageService,private route : ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'] 
    });
    this.unitService.FetchAllUnit(this.projectId)
    this.unitService.units$.subscribe((data)=>{
      this.units=data
    })
  }
  AddUnit(){

  }
  onDelete(id:number){
    this.unitService.DeleteUnit(id);
  }
}
