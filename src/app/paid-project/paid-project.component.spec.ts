import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidProjectComponent } from './paid-project.component';

describe('PaidProjectComponent', () => {
  let component: PaidProjectComponent;
  let fixture: ComponentFixture<PaidProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaidProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
