import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { fromPackage } from './store/selectors';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { PackageActions } from './store/actions';
import { fromLogin } from '../login/store/selectors';
import { PackageModel } from './package.model';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
})
export class PackagesComponent implements OnInit {
  public selectPackages$ = this.store.select(fromPackage.selectPackageState);
  public selectUserId$ = this.store.select(fromLogin.selectUserId);
  public isLoading = false;
  public packages: PackageModel[] = [];
  faPlusCircle = faPlusCircle;

  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private store: Store) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.selectUserId$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(
        PackageActions.getPackages({ userId: userId.toString() })
      );
    });
    this.selectPackages$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((packages) => {
        this.isLoading = !packages.isLoading;
        console.log('packages', packages.packages);
        this.packages = packages.packages;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goToNewPackage() {
    this.router.navigate(['paquetes', 'nuevo-paquete']);
  }
}
