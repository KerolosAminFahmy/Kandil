import { Component  } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout-project',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet,FooterComponent,CommonModule],
  templateUrl: './main-layout-project.component.html',
  styleUrl: './main-layout-project.component.css'
})
export class MainLayoutProjectComponent {
toggle() {
  this.openSocial=!this.openSocial}
  headerImageUrl: string = '';
  customClass: string = '';
  openSocial : boolean =false;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
  
 }

 ngOnInit(): void {
  this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe(() => {
    this.updateHeaderData();
  });

this.updateHeaderData();
  
 }
 private updateHeaderData(): void {
  const routeData = this.getRouteData(this.activatedRoute);
  this.headerImageUrl = routeData.headerImageUrl || '../../assets/Images/kd1.png';
  this.customClass = routeData.customClass || 'header-page';

}
  getRouteData(route: ActivatedRoute): any {
    let activeRoute = route;
    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }
    return activeRoute.snapshot.data;
  }
}
