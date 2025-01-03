import { Component } from '@angular/core';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { FinishItemDTO } from '../../shared/Models/model';
import { FinisghItemService } from '../../shared/Services/finisgh-item.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@Component({
  selector: 'app-finish-item-list',
  standalone: true,
  imports: [TitleNavigationComponent,CommonModule,RouterLink,PageNotFoundComponent],
  templateUrl: './finish-item-list.component.html',
  styleUrl: './finish-item-list.component.css'
})
export class FinishItemListComponent {
  items:FinishItemDTO[]=[];
  isOpen:boolean=false;
  breadcrumbs: { name: string; url: string }[] = [];
  ImageUrl:string=environment.apiImage
  selectedItem!:FinishItemDTO
  title:string="";
  FinishCategoryId:number=0;
  private subscriptions: Subscription = new Subscription();
  facebookShareUrl: string = '';
  twitterShareUrl: string = '';
  linkedinShareUrl: string = '';
  whatsappShareUrl: string = '';
  constructor(private finishItemService:FinisghItemService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.breadcrumbs.push(
      {name:"اقسام تشطبيات",url:"/finishcategory"}
    )
    const paramSub = this.route.params.subscribe((params) => {
      this.FinishCategoryId=+params['finishCategoryId']
      const Sub = this.finishItemService.getFinishItemWithName(this.FinishCategoryId).subscribe((data)=>{
        this.items=data.data
        this.title=data.name
        this.selectedItem=data.data[0]
        this.items.forEach((e)=>{
          e.imageName=this.ImageUrl+"Finish/"+e.imageName
        })
      })
      this.subscriptions.add(Sub);

    })
    this.subscriptions.add(paramSub);

    
  }
  openPreview(id:number|undefined){
    this.items.forEach((e)=>{
      if(e.id===id){
        this.selectedItem=e
      }
    })
    const pageUrl = window.location.href; // Current page URL
    const title = encodeURIComponent(this.selectedItem.title || '');
    const description = encodeURIComponent(this.selectedItem.description || '');
    const imageUrl = encodeURIComponent(this.selectedItem.imageName || '');

    this.facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    this.twitterShareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${title}`;
    this.linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${title}&summary=${description}`;
    this.whatsappShareUrl = `https://wa.me/?text=${pageUrl}`;
    this.isOpen=true;
  }
  removePreview(){
    this.isOpen=false;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
