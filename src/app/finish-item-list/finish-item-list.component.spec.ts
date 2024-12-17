import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishItemListComponent } from './finish-item-list.component';

describe('FinishItemListComponent', () => {
  let component: FinishItemListComponent;
  let fixture: ComponentFixture<FinishItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
