import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoContentService } from '../../shared/Services/info-content.service';
import { TitleNavigationComponent } from '../../shared/Component/title-navigation/title-navigation.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-content',
  standalone: true,
  imports: [CommonModule,TitleNavigationComponent],
  templateUrl: './info-content.component.html',
  styleUrl: './info-content.component.css'
})
export class InfoContentComponent {
  imageSrc: string = '';
  title:string="";
  quoteText: string = '';
  mainText: string = '';
  listItems: { title: string, description: string }[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private infoContentService: InfoContentService) {}

  ngOnInit(): void {
    const paramSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadContent(id);
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
}
