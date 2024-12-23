import { Component, ElementRef, ViewChild } from '@angular/core';
import { FinishItemDetailDTO } from '../../shared/Models/model';
import { environment } from '../../environments/environment';
import { FinisghItemService } from '../../shared/Services/finisgh-item.service';
import { ActivatedRoute } from '@angular/router';
import { SliderImageComponent } from '../../shared/Component/slider-image/slider-image.component';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-finish-item-detail',
  standalone: true,
  imports: [SliderImageComponent,CommonModule,TitleNavigationComponent],
  templateUrl: './finish-item-detail.component.html',
  styleUrl: './finish-item-detail.component.css'
})
export class FinishItemDetailComponent {
  items:FinishItemDetailDTO = {
    finishItem: {
      id: 0,
      title: '',
      description: '',
      imageName: '',
      latitude: 0,
      longitude: 0,
      nameLocation: '',
      videoUrl: '',
      finishCategoryId: 0,
    },
    finishImages: [],
  };
  breadcrumbs: { name: string; url: string }[] = [];
  ImageUrl:string=environment.apiImage
  FinishCategoryId:number=0;
  FinishId:number=0;
  safeUrl:any="";
  safeContent:any="";
  title:string = "";
  private subscriptions: Subscription = new Subscription();

  @ViewChild('richTextIframe') iframe!: ElementRef<HTMLIFrameElement>;

  imagesName:Array<string>=[];
  isReady=false;
  constructor(private sanitizer: DomSanitizer,private finishItemService:FinisghItemService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.breadcrumbs.push(
      {name:"اقسام تشطبيات",url:"/finishcategory"}
    )
    const paramSub = this.route.params.subscribe((params) => {
      this.FinishCategoryId=+params['finishCategoryId']
      this.FinishId= +params['FinishItemDetail']
      this.finishItemService.getFinishItem(this.FinishId).subscribe((data)=>{
        data.finishImages.forEach((e)=>{
          this.imagesName.push(this.ImageUrl+"Finish/"+e.imageName)
        })
        this.items=data
        this.title=data.finishItem.title
  
        this.SafeContent(this.items.finishItem.videoUrl,this.items.finishItem.description)
        this.adjustIframeHeight();
        this.isReady=true
      })
    })
    
    this.subscriptions.add(paramSub);

  }
  SafeContent(url:string,description:string){


    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml( this.getRtlContent(description));
    console.log(this.safeUrl)
    console.log(this.safeContent)
  }
  getRtlContent(description: string): string {
    const rtlStyle = `
      <style>
        body{
          direction: rtl;
          text-align: right;
          height: max-content;
          overflow-y: hidden;
          font-family: Arial, sans-serif; /* Optional */
        }
      </style>
    `;
    return `${rtlStyle}${description}`;
  }
  adjustIframeHeight(): void {
    const iframe = this.iframe.nativeElement;

    // Wait for the iframe to load
    iframe.onload = () => {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDocument) {
        const iframeBody = iframeDocument.body;
        iframe.style.height = `${iframeBody.scrollHeight}px`;
      }
    };
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
