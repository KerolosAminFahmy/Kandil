import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidAreaComponent } from './paid-area.component';

describe('PaidAreaComponent', () => {
  let component: PaidAreaComponent;
  let fixture: ComponentFixture<PaidAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaidAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
