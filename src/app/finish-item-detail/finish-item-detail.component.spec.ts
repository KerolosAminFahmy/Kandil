import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishItemDetailComponent } from './finish-item-detail.component';

describe('FinishItemDetailComponent', () => {
  let component: FinishItemDetailComponent;
  let fixture: ComponentFixture<FinishItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishItemDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
