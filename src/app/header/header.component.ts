import { CommonModule } from '@angular/common';
import { Component , ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AllAreaDTO, MediaCategory } from '../../shared/Models/model';
import { AreaService } from '../../shared/Services/area.service';
import { MediaCategoryService } from '../../shared/Services/media-category.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('header') header!: ElementRef;
  @ViewChild('buttonUp') buttonUp!: ElementRef;
  @Input() headerImageUrl: string = '../assets/Images/k1.png';
  @Input() customClass: string = 'home';
  isSidebarOpen = false;
  isOverlayVisible = false;
  constructor(private AreaService:AreaService,private MediaCategory:MediaCategoryService){}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isOverlayVisible = !this.isOverlayVisible;
  }
  @ViewChildren('arrow') arrowElements!: QueryList<ElementRef>;
  arrowActive: boolean = false;
  subMenuActive: boolean = false;
  AllArea!:AllAreaDTO[];
  AllMediaCategory!:MediaCategory[];
  headerOffset = 0;
  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
    this.AreaService.fetchArea();
    this.AreaService.areas$.subscribe((data)=>{
      this.AllArea=data
    })
    this.MediaCategory.fetchCities();
    this.MediaCategory.MediaCategory$.subscribe((data)=>{
      this.AllMediaCategory=data
    })
  }
  ngAfterViewInit(): void {
    this.headerOffset = this.header?.nativeElement.offsetTop;
  }
  ngOnDestroy(): void {
    window.removeEventListener("click",this.onScroll);
  }
  onScroll = (): void => {
    const scrollY = window.scrollY;
    if (scrollY > this.headerOffset) {
      this.header.nativeElement.classList.add('FixedAtTop');
      if (scrollY > this.headerOffset + 400) {
        this.header.nativeElement.classList.add('ColorBlack');
        this.buttonUp.nativeElement.style.display = "block";
      } else {
        this.header.nativeElement.classList.remove('ColorBlack');
        this.buttonUp.nativeElement.style.display = "none";
      }
    } else {
      this.header.nativeElement.classList.remove('FixedAtTop');
      this.header.nativeElement.classList.remove('ColorBlack');
      this.buttonUp.nativeElement.style.display = "none";
    }

  };
  scrollToTopManual1(event: Event): void {
    event.preventDefault(); 
  
    const slowScrollStep = -window.scrollY / (600 / 15); 
    const fastScrollStep = -window.scrollY / (300 / 15);
    const scrollInterval = setInterval(() => {
      const currentScroll = window.scrollY;
  
      const scrollStep = currentScroll > 100 ? slowScrollStep : fastScrollStep;
  
      if (currentScroll !== 0) {
        window.scrollBy(0, scrollStep); 
      } else {
        clearInterval(scrollInterval);
      }
    }, 15); // Adjust the interval for a smoother effect
  }
  scrollToTopManual(event: Event): void {
    event.preventDefault(); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  toggleSubMenu(arrow: HTMLDivElement): void {
    this.arrowActive = !this.arrowActive;
    arrow.querySelectorAll(".ArrowLine")[0].classList.toggle("ActiveArrowLine")
    arrow.querySelectorAll(".ArrowLine")[1].classList.toggle("ActiveArrowLine")
    arrow.nextElementSibling?.nextElementSibling?.classList.toggle("active-sub-menu")
    if(arrow.nextElementSibling?.nextElementSibling?.nextElementSibling){
      arrow.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle("active-sub-menu")
    }
    // const nextSibling = arrow.nativeElement.nextElementSibling;
    // if (nextSibling && nextSibling.classList.contains('sub-menu')) {
    //   this.subMenuActive = !this.subMenuActive;
    // }
  }
}
