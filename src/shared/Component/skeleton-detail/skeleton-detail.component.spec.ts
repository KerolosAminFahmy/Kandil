import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDetailComponent } from './skeleton-detail.component';

describe('SkeletonDetailComponent', () => {
  let component: SkeletonDetailComponent;
  let fixture: ComponentFixture<SkeletonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
