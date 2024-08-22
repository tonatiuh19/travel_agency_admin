import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faChevronCircleDown,
  faStore,
  faUser,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { fromLogin } from '../../../login/store/selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginActions } from '../../../login/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public selectLoginState$ = this.store.select(fromLogin.selectLoginState);

  public isAuth = false;

  faChevronCircleDown = faChevronCircleDown;
  faStore = faStore;
  faUser = faUser;
  faPowerOff = faPowerOff;
  formGroup: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      step1: this.fb.group({
        field1: ['', Validators.required],
        field2: ['', Validators.required],
      }),
      step2: this.fb.group({
        field3: ['', Validators.required],
        field4: ['', Validators.required],
      }),
      step3: this.fb.group({
        field5: ['', Validators.required],
        field6: ['', Validators.required],
      }),
    });
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit() {
    this.selectLoginState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loginState) => {
        if (loginState.isAuthenticated) {
          this.isAuth = true;
        } else {
          this.router.navigate(['']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goToPackages() {
    this.router.navigate(['paquetes']);
  }

  logOut() {
    this.store.dispatch(LoginActions.signOff());
  }
}
