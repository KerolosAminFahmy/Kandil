import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorjectAreaComponent } from './porject-area.component';

describe('PorjectAreaComponent', () => {
  let component: PorjectAreaComponent;
  let fixture: ComponentFixture<PorjectAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorjectAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PorjectAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
