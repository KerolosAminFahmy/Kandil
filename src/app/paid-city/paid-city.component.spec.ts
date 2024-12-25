import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidCityComponent } from './paid-city.component';

describe('PaidCityComponent', () => {
  let component: PaidCityComponent;
  let fixture: ComponentFixture<PaidCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaidCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
