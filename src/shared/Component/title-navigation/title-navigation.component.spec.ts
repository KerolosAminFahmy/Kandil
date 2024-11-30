import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleNavigationComponent } from './title-navigation.component';

describe('TitleNavigationComponent', () => {
  let component: TitleNavigationComponent;
  let fixture: ComponentFixture<TitleNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
