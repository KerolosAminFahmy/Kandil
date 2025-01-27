import { Component } from '@angular/core';
import { TitleNavigationComponent } from "../../shared/Component/title-navigation/title-navigation.component";
import { ActivatedRoute } from '@angular/router';
import { ShowUnitsDTO } from '../../shared/Models/model';
import { UnitManageService } from '../../shared/Services/unit-manage.service';
import { SliderImageComponent } from "../../shared/Component/slider-image/slider-image.component";
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { StatusTranslatePipe } from '../../shared/Pipes/status-translate.pipe';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { SkeletonDetailUnitComponent } from '../../shared/Component/skeleton-detail-unit/skeleton-detail-unit.component';

@Component({
  selector: 'app-detail-unit',
  standalone: true,
  imports: [TitleNavigationComponent, SliderImageComponent,CommonModule,StatusTranslatePipe,SkeletonDetailUnitComponent],
  templateUrl: './detail-unit.component.html',
  styleUrl: './detail-unit.component.css'
})
export class DetailUnitComponent {
  ImageUrl:string=environment.apiImage
  breadcrumbs: { name: string; url: string }[] = [];
  isLoading:boolean=true;
  unitId:number=0;
  unit!:ShowUnitsDTO;
  safeUrl:SafeResourceUrl|null="";
  safeContent!: SafeHtml;
  service!:Array<Array<string>>;
  imagesName:Array<string>=[];
  private subscriptions: Subscription = new Subscription();

  constructor(private route:ActivatedRoute,private unitService:UnitManageService,private sanitizer: DomSanitizer) {
    
  }
  ngOnInit(): void {
    this.breadcrumbs.push(
      {name:"وحدات",url:"/unit"}
    )
    const paramSub=this.route.params.subscribe((params) => {
      this.unitId = +params['unitId'];
      const Sub = this.unitService.fetchUpdate(this.unitId).subscribe((data)=>{
        this.unit=data
        this.SafeContent(data.videoUrl,data.description)
        data.unitImages.forEach((e)=>{
          this.imagesName.push(this.ImageUrl+'Units/'+e.imageName)
        })
        this.service=this.splitIntoChunks(data.serviceUnits.map(e=>e.text),3);
        setTimeout(()=>{

          this.isLoading=false
        },500)
      })
      this.subscriptions.add(Sub);

    });
    this.subscriptions.add(paramSub);
    
  }
  SafeContent(url:string,description:string){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(description);
  }
  splitIntoChunks(arr: string[], chunks: number): string[][] {
    const result: string[][] = [];
    const chunkSize = Math.ceil(arr.length / chunks);
  
    for (let i = 0; i < chunks; i++) {
      result.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
    }
  
    return result;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
