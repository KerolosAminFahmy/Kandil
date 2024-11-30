import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appIncreaseNumber]'
})
export class IncreaseNumberDirective implements OnInit {
  @Input('dataValue') finalValue!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.observeElement();
  }

  observeElement() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.increaseNumberAnimation();
          observer.unobserve(this.el.nativeElement); // Stop observing after animation starts
        }
      });
    });

    observer.observe(this.el.nativeElement);
  }

  increaseNumberAnimation() {
    const element = this.el.nativeElement;
    const finalValue = this.finalValue;
    let currentValue = 0;
    const intervalTime = 2000 / finalValue;

    const timer = setInterval(() => {
      currentValue++;
      element.textContent = currentValue.toString();
      if (currentValue >= finalValue) {
        clearInterval(timer);
      }
    }, intervalTime);
  }
}
