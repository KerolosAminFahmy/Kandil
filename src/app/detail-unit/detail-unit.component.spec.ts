import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUnitComponent } from './detail-unit.component';

describe('DetailUnitComponent', () => {
  let component: DetailUnitComponent;
  let fixture: ComponentFixture<DetailUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
