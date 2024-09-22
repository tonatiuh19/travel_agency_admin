import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  faCalendar,
  faCalendarAlt,
  faSubway,
  faHome,
  faLock,
  faCheckCircle,
  faStar,
  faStarHalfAlt,
  faShareSquare,
  faCar,
  faHotel,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { LandingActions } from '../landing/store/actions';
import { fromLanding } from '../landing/store/selectors';
import { FullPackageModel } from '../landing/landing.model';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.css',
})
export class PackageComponent implements OnInit {
  public selectPackage$ = this.store.select(fromLanding.selectFullPackageById);
  public isLoading = false;
  public package: any;

  stars: any[] = [];

  faCalendar = faCalendar;
  faCalendarAlt = faCalendarAlt;
  faSubway = faSubway;
  faHome = faHome;
  faLock = faLock;
  faCheckCircle = faCheckCircle;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faShareSquare = faShareSquare;
  faCar = faCar;
  faHotel = faHotel;
  faCommentDots = faCommentDots;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.renderer.setProperty(document.body, 'scrollTop', 0);
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
    window.scrollTo(0, 0);

    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const id = params.get('id');
      this.store.dispatch(
        LandingActions.getFullPackageById({
          packID: id ? parseInt(id, 10) : 0,
        })
      );
    });

    this.selectPackage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((packageById) => {
        this.isLoading = !packageById.isLoading;
        this.package = packageById.package;
        this.calculateStars(this.package.averageRating);
      });

    this.checkScroll();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  calculateStars(rating: number): void {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        this.stars.push(this.faStar);
      } else if (rating >= i - 0.5) {
        this.stars.push(this.faStarHalfAlt);
      }
    }
  }

  buyPackage(packID: number): void {
    this.router.navigate(['checkout', packID]);
  }

  public extractFirstDate(dateRange: string): string {
    const parts = dateRange.split(' ');
    const firstDatePart = parts[0].trim();
    return firstDatePart;
  }

  public extractSecondDate(dateRange: string): string {
    const parts = dateRange.split(' ');
    const dateAfterSecondSpace = parts[2].trim();
    return dateAfterSecondSpace;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  checkScroll(): void {
    const priceContainer = document.getElementById('price-container');
    const footer = document.querySelector('app-footer-reviewer');

    if (priceContainer && footer) {
      const footerRect = footer.getBoundingClientRect();
      const priceContainerRect = priceContainer.getBoundingClientRect();

      if (footerRect.top <= window.innerHeight) {
        priceContainer.classList.remove('fixed-bottom');
        priceContainer.classList.add('static-bottom');
      } else {
        priceContainer.classList.remove('static-bottom');
        priceContainer.classList.add('fixed-bottom');
      }
    }
  }
}
