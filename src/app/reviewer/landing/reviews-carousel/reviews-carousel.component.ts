import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReviewsModel } from '../landing.model';

@Component({
  selector: 'app-reviews-carousel',
  templateUrl: './reviews-carousel.component.html',
  styleUrl: './reviews-carousel.component.css',
})
export class ReviewsCarouselComponent implements OnInit, OnDestroy {
  @Input() reviews: ReviewsModel[] = [];
  currentIndex: number = 0;
  intervalId: any;

  constructor() {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  nextReview(): void {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  prevReview(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextReview();
    }, 3000); // Change review every 3 seconds
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
