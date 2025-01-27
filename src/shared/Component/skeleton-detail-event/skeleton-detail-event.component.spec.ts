import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDetailEventComponent } from './skeleton-detail-event.component';

describe('SkeletonDetailEventComponent', () => {
  let component: SkeletonDetailEventComponent;
  let fixture: ComponentFixture<SkeletonDetailEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonDetailEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonDetailEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
