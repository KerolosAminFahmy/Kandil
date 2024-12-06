import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { projectCategory, ViewAreaDTO } from '../../shared/Models/model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/Component/card/card.component';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { AreaService } from '../../shared/Services/area.service';
import { environment } from '../../environments/environment';
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";

@Component({
  selector: 'app-porject-area',
  standalone: true,
  imports: [CommonModule, CardComponent, TitleNavigationComponent, PageNotFoundComponent],
  templateUrl: './porject-area.component.html',
  styleUrl: './porject-area.component.css'
})
export class PorjectAreaComponent implements OnInit {
  ImageUrl:string=environment.apiImage

  LoadedData!:ViewAreaDTO[];
  Title:string|undefined="12";
  areaId:number=0;
  breadcrumbs: { name: string; url: string }[] = [];

  @Output() dataTitle: EventEmitter<string> = new EventEmitter();

  constructor(private route: ActivatedRoute, private areaService: AreaService) {}
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.areaId= +params['categoryId'];
     

    });
    this.areaService.fetchAreaByCity(this.areaId).subscribe((data)=>{
      this.Title=data[0].city?.name
      this.LoadedData=data
      this.LoadedData.forEach((e)=>{
        e.imageName=this.ImageUrl+e.imageName
      })
    })
    this.breadcrumbs.push(
      {name:"اقسام المشاريع",url:"/projectcategory"}
    )
    this.dataTitle.emit(this.Title)
  }
}
