import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
declare const Pace: any;  

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.css',
  encapsulation:ViewEncapsulation.None
})
export class LoadingPageComponent implements OnInit {
  

  constructor(private renderer: Renderer2,private router:Router) {
    this.router.events.subscribe(event => {
      // if (event instanceof NavigationStart) {
      //   Pace.on('start', () => {
      //     this.renderer.removeClass(document.getElementById('preloader'), 'isdone');
      //     this.renderer.removeClass(document.querySelector('.loading-image'), 'isdone');
          
      //   });
      //   }else if (event instanceof NavigationEnd) {
      //     Pace.on('done', () => {
      //       this.renderer.addClass(document.getElementById('preloader'), 'isdone');
      //       this.renderer.addClass(document.querySelector('.loading-image'), 'isdone');
      //     });
      //  }
    });
  }
  ngOnInit(): void {
    (window as any).paceOptions = {
      ajax: true,
      document: true,
      eventLag: false
    };
  }
}
