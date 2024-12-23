import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusTranslatePipe } from '../../Pipes/status-translate.pipe';
import { CoverImageService } from '../../Services/cover-image.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-title-navigation',
  standalone: true,
  imports: [RouterLink,CommonModule,StatusTranslatePipe],
  templateUrl: './title-navigation.component.html',
  styleUrl: './title-navigation.component.css'
})
export class TitleNavigationComponent {
  @Input() title: string = '';
  @Input() isUnit:boolean=false;
  @Input() statusUnit:string="";
  @Input() breadcrumbs : { name: string; url: string }[] = [];
  ImageName:string = "../../../assets/Images/14.jpg";
  imageApi:string=environment.apiImage;
  type:string = 'img';
  private subscriptions: Subscription = new Subscription();

  @Input() id: number = 0;
  constructor(private CoverImage:CoverImageService){

  }
  ngOnInit(): void {
    if(this.id !=0){
      const Sub = this.CoverImage.getCoverImageById(this.id).subscribe((data)=>{
        this.ImageName=this.imageApi+'Cover/'+data.imageName
        this.type=data.imageType
      })
      this.subscriptions.add(Sub);
    }
    
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
