import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDetailUnitComponent } from './skeleton-detail-unit.component';

describe('SkeletonDetailUnitComponent', () => {
  let component: SkeletonDetailUnitComponent;
  let fixture: ComponentFixture<SkeletonDetailUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonDetailUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonDetailUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
