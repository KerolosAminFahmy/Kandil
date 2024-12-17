import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishItemManageComponent } from './finish-item-manage.component';

describe('FinishItemManageComponent', () => {
  let component: FinishItemManageComponent;
  let fixture: ComponentFixture<FinishItemManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishItemManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishItemManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
