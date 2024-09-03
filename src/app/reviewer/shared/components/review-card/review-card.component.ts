import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  @Input() reviewerName!: string;
  @Input() reviewerSurName!: string;
  @Input() rating!: number;
  @Input() comment!: string;
  @Input() dateTimestamp!: Date;

  stars: number[] = [1, 2, 3, 4, 5];

  decodeUtf8(s: string): string {
    return decodeURIComponent(escape(s));
  }
}
