import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishCategoryManageComponent } from './finish-category-manage.component';

describe('FinishCategoryManageComponent', () => {
  let component: FinishCategoryManageComponent;
  let fixture: ComponentFixture<FinishCategoryManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishCategoryManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishCategoryManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
