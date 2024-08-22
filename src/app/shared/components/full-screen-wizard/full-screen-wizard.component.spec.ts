import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenWizardComponent } from './full-screen-wizard.component';

describe('FullScreenWizardComponent', () => {
  let component: FullScreenWizardComponent;
  let fixture: ComponentFixture<FullScreenWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullScreenWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullScreenWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
