import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUnitComponent } from './all-unit.component';

describe('AllUnitComponent', () => {
  let component: AllUnitComponent;
  let fixture: ComponentFixture<AllUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
