import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinishItemComponent } from './edit-finish-item.component';

describe('EditFinishItemComponent', () => {
  let component: EditFinishItemComponent;
  let fixture: ComponentFixture<EditFinishItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFinishItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFinishItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
