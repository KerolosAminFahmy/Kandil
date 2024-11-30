import { Component} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { filter } from 'rxjs';
import { LoadingPageComponent } from "./loading-page/loading-page.component";
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

declare const Pace: any; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToastModule, CommonModule, LoadingPageComponent],
  providers:[ MessageService],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'Kandil-realstate';
  constructor(private router: Router,
     private activatedRoute: ActivatedRoute) {
   
  }

  ngOnInit() {
   
      
  }

 
}
