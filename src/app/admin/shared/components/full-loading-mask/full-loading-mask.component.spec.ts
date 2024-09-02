import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLoadingMaskComponent } from './full-loading-mask.component';

describe('FullLoadingMaskComponent', () => {
  let component: FullLoadingMaskComponent;
  let fixture: ComponentFixture<FullLoadingMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullLoadingMaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullLoadingMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
