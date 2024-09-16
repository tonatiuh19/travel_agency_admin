import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  faPlane,
  faBolt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { LandingActions } from '../../../landing/store/actions';
import { fromLanding } from '../../../landing/store/selectors';
import { Subject, take, takeUntil } from 'rxjs';
import { UserModel } from '../../../landing/landing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-reviewer',
  templateUrl: './header-reviewer.component.html',
  styleUrl: './header-reviewer.component.css',
})
export class HeaderReviewerComponent implements OnInit {
  @Input() isMain = true;

  public selectUser$ = this.store.select(fromLanding.selectUser);
  public user: any = {};
  public isLogged = false;

  public hasBooking = false;

  public isColorDark = true;

  profile: any = null;
  faPlane = faPlane;
  faBolt = faBolt;
  faUserCircle = faUserCircle;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public auth: AuthService,
    private store: Store,
    private router: Router
  ) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
      if (profile) {
        this.store.dispatch(
          LandingActions.authenticateUser({
            user: profile,
          })
        );
      }
    });

    this.selectUser$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.user = user;
      this.hasBooking = this.user.hasBookings == 1;
      this.isLogged = !!(user && this.user.custID !== '');
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login(): void {
    const urlSegment = this.router.url.split('/').slice(1).join('/');

    this.auth.loginWithRedirect({
      appState: { target: urlSegment },
    });
  }

  logOut(): void {
    this.isLogged = false;
    this.store.dispatch(LandingActions.logoutUser());
    this.auth.logout();
  }

  goToTrips(): void {
    this.router.navigate(['misviajes']);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');

    const targetElement = document.getElementById('target-element');

    if (this.isMain) {
      if (navbar && targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top;
        const navbarHeight = navbar.offsetHeight;

        if (targetPosition <= navbarHeight) {
          this.isColorDark = false;
          navbar.classList.add('bg-primary');
        } else {
          this.isColorDark = true;
          navbar.classList.remove('bg-primary');
        }
      }
    } else {
      navbar ? navbar.classList.add('bg-primary') : null;
    }
  }
}
