import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishCategoryComponent } from './finish-category.component';

describe('FinishCategoryComponent', () => {
  let component: FinishCategoryComponent;
  let fixture: ComponentFixture<FinishCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
