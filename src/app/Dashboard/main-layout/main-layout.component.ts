import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ToastService } from '../../../shared/Services/toast.service';
import { AuthService } from '../../../shared/Services/auth.service';
import { LoaderComponent } from '../../../shared/Component/loader/loader.component';
import { LoaderService } from '../../../shared/Services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
registerLocaleData(localeAr, 'ar');

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ToastModule, ButtonModule, RippleModule,RouterOutlet,CommonModule ,LoaderComponent, IonicModule ,RouterLinkActive ,RouterLink],
  
  providers:  [
   
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
 
})
export class MainLayoutComponent {
  isMenuActive = false;
  constructor(private loaderService:LoaderService,  private messageService: MessageService,private auth:AuthService,private toast:ToastService) {}
  ngOnInit(): void {
    this.toast.MassegeToast.subscribe((data)=>{
      this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.detail ,life: data.life  });

    })
  }
  show() {
  }
  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }
  Signout(){
    this.auth.clearTokens()
  }
}
