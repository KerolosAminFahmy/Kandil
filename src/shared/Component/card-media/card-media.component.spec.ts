import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMediaComponent } from './card-media.component';

describe('CardMediaComponent', () => {
  let component: CardMediaComponent;
  let fixture: ComponentFixture<CardMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
