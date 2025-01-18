import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../../shared/Services/auth.service';
import { LoaderComponent } from '../../../shared/Component/loader/loader.component';
import { LoaderService } from '../../../shared/Services/loader.service';
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
  constructor(private loaderService:LoaderService, private auth:AuthService) {}
  ngOnInit(): void {
    
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
