import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyUsPageComponent } from './why-us-page.component';

describe('WhyUsPageComponent', () => {
  let component: WhyUsPageComponent;
  let fixture: ComponentFixture<WhyUsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyUsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhyUsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
