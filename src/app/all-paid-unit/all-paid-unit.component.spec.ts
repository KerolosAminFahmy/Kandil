import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaidUnitComponent } from './all-paid-unit.component';

describe('AllPaidUnitComponent', () => {
  let component: AllPaidUnitComponent;
  let fixture: ComponentFixture<AllPaidUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPaidUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllPaidUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
