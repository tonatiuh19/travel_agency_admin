import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-reviewer-mask',
  templateUrl: './loading-reviewer-mask.component.html',
  styleUrl: './loading-reviewer-mask.component.css',
})
export class LoadingReviewerMaskComponent {
  @Input() isLoading: boolean = false;
}
