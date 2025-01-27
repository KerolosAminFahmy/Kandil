import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoContentService } from '../../shared/Services/info-content.service';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { Subscription } from 'rxjs';
import { WhyusService } from '../../shared/Services/whyus.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { SkeletonDetailComponent } from '../../shared/Component/skeleton-detail/skeleton-detail.component';

@Component({
  selector: 'app-info-content',
  standalone: true,
  imports: [CommonModule,TitleNavigationComponent,SkeletonDetailComponent],
  templateUrl: './info-content.component.html',
  styleUrl: './info-content.component.css'
})
export class InfoContentComponent {
  imageSrc: string = '';
  title:string="";
  isLoading:boolean=true;
  quoteText: string = '';
  mainText: string = '';
  safeContent:any="";
    apiUrl:string=environment.apiUrl

  data:{fullDescription:string,imageUrl:String,quote:string,title:string};
  @ViewChild('richTextIframe') iframe!: ElementRef<HTMLIFrameElement>;

  listItems: { title: string, description: string }[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private sanitizer: DomSanitizer,private route: ActivatedRoute,private WhyUs:WhyusService, private infoContentService: InfoContentService) {

    this.data = {
      fullDescription: '',
      imageUrl: '',
      quote: '',
      title: ''
    };
  }

  ngOnInit(): void {
    const paramSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadContent(id);
    });
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.WhyUs.get(id).subscribe((data)=>{
      this.data=data
      this.SafeContent(data?.fullDescription)
      //this.adjustIframeHeight()
      setTimeout(() => {
        this.isLoading=false
      }, 100);
      })
    });
    this.subscriptions.add(paramSub);

  }

  loadContent(id: string | null): void {
    const content = this.infoContentService.loadContent(id);
    this.title = content.title;
    this.imageSrc = content.imageSrc;
    this.quoteText = content.quoteText;
    this.mainText = content.mainText;
    this.listItems = content.listItems;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  SafeContent(description:string){


    this.safeContent = this.sanitizer.bypassSecurityTrustHtml( this.getRtlContent(description));
    //this.safeContent = this.sanitizer.bypassSecurityTrustHtml( description);
  }
  getRtlContent(description: string): string {
    const rtlStyle = `
      <style>
       section.InfoContent ul {
        padding-right: 20px;
        list-style: circle;
      }
      section.InfoContent ul li {
        font-weight: 200;
        font-size: 20px;
        color: #5c727d;
        margin-top: 1rem;
      }
      </style>
    `;
    return `${rtlStyle}${description}`;
  }
  adjustIframeHeight(): void {
    const iframe = this.iframe.nativeElement;
    iframe.onload = () => {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDocument) {
        const iframeBody = iframeDocument.body;
        iframe.style.height = `${iframeBody.scrollHeight+200}px`;
      }
    };
  }
}
