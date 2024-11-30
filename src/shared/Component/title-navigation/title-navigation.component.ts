import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusTranslatePipe } from '../../Pipes/status-translate.pipe';

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
  @Input() breadcrumbs: { name: string; url: string }[] = [];

}
