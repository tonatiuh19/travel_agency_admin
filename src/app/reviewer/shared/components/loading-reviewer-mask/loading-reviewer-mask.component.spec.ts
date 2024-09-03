import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingReviewerMaskComponent } from './loading-reviewer-mask.component';

describe('LoadingReviewerMaskComponent', () => {
  let component: LoadingReviewerMaskComponent;
  let fixture: ComponentFixture<LoadingReviewerMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingReviewerMaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingReviewerMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
