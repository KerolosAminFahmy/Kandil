import { Component, Renderer2} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../shared/Services/toast.service';

declare const Pace: any; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToastModule, CommonModule],
  providers:[ MessageService],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'Kandil-realstate';
  constructor(private router: Router,
    private toast:ToastService,
    private messageService: MessageService,
    private renderer: Renderer2) {
   
  }
  first:boolean=false;

  loadPaceJs(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/pace-js/pace.min.js';
    this.renderer.appendChild(document.body, script);

    // Configure Pace options
    (window as any).paceOptions = {
      ajax: false,
      document: false,
      eventLag: false,
      restartOnRequestAfter: false
    };

    script.onload = () => {
      if (!(window as any).Pace || !(window as any).Pace.running) {
        (window as any).Pace.start();
      }
    };
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (this.router.url === '/home' && !this.first) {
        this.first=true
        this.loadPaceJs();
      }else if(this.router.url !== '/home' && this.first){
        const paceElement = document.querySelector("div.pace");
        if (paceElement) {
          paceElement.innerHTML = ``;
          paceElement.classList.value='';
          document.body.classList.value=""
        }      
      }
    });
    this.toast.MassegeToast.subscribe((data)=>{
      if(data!=null)
      this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.detail ,life: data.life  });
        
    })
      
  }
 
}
