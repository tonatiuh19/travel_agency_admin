import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public package: FullPackageModel[] = [];

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
    private route: ActivatedRoute
  ) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
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
        this.package = packageById.package
          ? (packageById.package as unknown as FullPackageModel[])
          : [];

        console.log(this.package[0]);
        this.calculateStars(this.package[0].averageRating);
      });
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
}
