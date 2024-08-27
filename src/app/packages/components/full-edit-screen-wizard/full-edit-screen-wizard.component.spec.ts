import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullEditScreenWizardComponent } from './full-edit-screen-wizard.component';

describe('FullEditScreenWizardComponent', () => {
  let component: FullEditScreenWizardComponent;
  let fixture: ComponentFixture<FullEditScreenWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullEditScreenWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullEditScreenWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
