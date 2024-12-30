import { Component } from '@angular/core';
import { TitleNavigationComponent } from "../../shared/Component/title-navigation/title-navigation.component";
import { PageSectionService } from '../../shared/Services/page-section.service';
import { PageSection } from '../../shared/Models/model';
import { environment } from '../../environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [TitleNavigationComponent,CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css'
})
export class WhyUsComponent {
  items:PageSection[]=[]
  imageApi:string=environment.apiImage;
  
  constructor(private PageSection:PageSectionService,private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    
    this.LoadItems()
  }
  LoadItems(){
    this.PageSection.getAll().subscribe((data)=>{
      this.items=data
    })
  }
    SafeContent(description:string):SafeHtml{
      return this.sanitizer.bypassSecurityTrustHtml(description);
  
    }
}
