import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinishItemComponent } from './add-finish-item.component';

describe('AddFinishItemComponent', () => {
  let component: AddFinishItemComponent;
  let fixture: ComponentFixture<AddFinishItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFinishItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFinishItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
