import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderManageComponent } from './slider-manage.component';

describe('SliderManageComponent', () => {
  let component: SliderManageComponent;
  let fixture: ComponentFixture<SliderManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SliderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
