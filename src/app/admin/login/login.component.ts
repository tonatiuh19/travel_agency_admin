import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromLogin } from './store/selectors';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { LoginActions } from './store/actions';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public selectLoginState$ = this.store.select(fromLogin.selectLoginState);

  public isLoading = false;

  public isError = false;

  private unsubscribe$ = new Subject<void>();

  loginForm: FormGroup;

  faExclamationCircle = faExclamationCircle;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.selectLoginState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loginState) => {
        this.isLoading = !loginState.isLoading;
        this.isError = !loginState.isError;
        if (loginState.isAuthenticated) {
          this.router.navigate(['admin/bienvenido']);
        } else {
          this.router.navigate(['admin']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /*handleLoginClick(): void {
    this.store.dispatch(
      LoginActions.login({
        loginEntity: { email: 'tg@tienditacafe.com', password: '12345' },
      }),
    );
  }*/

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        LoginActions.login({
          loginEntity: {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
          },
        })
      );
    } else {
      // Mark all fields as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
    }
  }
}
