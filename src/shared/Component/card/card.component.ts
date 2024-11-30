import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomDatePipe } from '../../Pipes/custom-date.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule , RouterLink,CustomDatePipe ],

  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title:string ='';
  @Input() Url:string ='';
  @Input() imgUrl:string ='';
  @Input() isMedia:boolean=false;
  @Input() date:string="";
  @Input() media:{mediaType:string,url:string}={mediaType:"",url:""};
}
