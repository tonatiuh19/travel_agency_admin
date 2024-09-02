import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullScreenWizardNewPackageComponent } from './full-screen-wizard-new-package.component';

describe('FullScreenWizardNewPackageComponent', () => {
  let component: FullScreenWizardNewPackageComponent;
  let fixture: ComponentFixture<FullScreenWizardNewPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullScreenWizardNewPackageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullScreenWizardNewPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
