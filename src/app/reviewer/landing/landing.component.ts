import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import {
  CitiesWithCountOfPackagesModel,
  PackageModel,
  ReviewsModel,
} from './landing.model';
import { LandingActions } from './store/actions';
import { fromLanding } from './store/selectors';
import {
  faGift,
  faArrowAltCircleRight,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  public selectPackages$ = this.store.select(fromLanding.selectLandingState);
  public isLoading = false;
  public packages: PackageModel[] = [];
  public cities: CitiesWithCountOfPackagesModel[] = [];
  public reviews: ReviewsModel[] = [];
  public quotes: string[] = [
    'Descubre lo hermoso',
    'Descubre la belleza',
    'Descubre el mundo',
  ];

  public currentQuoteIndex: number = 0;

  faGift = faGift;
  faArrowAltCircleRight = faArrowAltCircleRight;
  faMapMarkerAlt = faMapMarkerAlt;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit() {
    this.typeQuote();
    this.store.dispatch(LandingActions.getFullPackages());
    this.store.dispatch(LandingActions.getCitiesWithCountOfPackages());
    this.store.dispatch(LandingActions.getReviews());

    this.selectPackages$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((packages) => {
        this.isLoading = !packages.isLoading;
        this.packages = packages.packages;
        this.cities = packages.cities ? packages.cities : [];
        this.reviews = packages.reviews ? packages.reviews : [];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  typeQuote() {
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.textContent = '';
      const quote = this.quotes[this.currentQuoteIndex];
      let charIndex = 0;

      const typeInterval = setInterval(() => {
        if (charIndex < quote.length) {
          quoteElement.textContent += quote.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            this.currentQuoteIndex =
              (this.currentQuoteIndex + 1) % this.quotes.length;
            this.typeQuote();
          }, 2000); // Pause before typing the next quote
        }
      }, 100); // Typing speed
    }
  }
}
