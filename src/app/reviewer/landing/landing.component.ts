import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { PackageModel } from './landing.model';
import { LandingActions } from './store/actions';
import { fromLanding } from './store/selectors';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  public selectPackages$ = this.store.select(fromLanding.selectLandingState);
  public isLoading = false;
  public packages: PackageModel[] = [];
  public quotes: string[] = [
    'Descubre lo hermoso',
    'Descubre la belleza',
    'Descubre el mundo',
  ];

  public currentQuoteIndex: number = 0;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit() {
    this.typeQuote();
    this.store.dispatch(LandingActions.getFullPackages());
    this.selectPackages$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((packages) => {
        console.log(packages);
        this.isLoading = !packages.isLoading;
        this.packages = packages.packages;
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
