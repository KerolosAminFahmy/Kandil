import { Component} from '@angular/core';
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
     private activatedRoute: ActivatedRoute,private toast:ToastService,private messageService: MessageService) {
   
  }

  ngOnInit() {
    this.toast.MassegeToast.subscribe((data)=>{
      this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.detail ,life: data.life  });
        
    })
      
  }

 
}
