import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutProjectComponent } from './main-layout-project.component';

describe('MainLayoutProjectComponent', () => {
  let component: MainLayoutProjectComponent;
  let fixture: ComponentFixture<MainLayoutProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainLayoutProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
