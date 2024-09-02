import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { fromPackage } from './store/selectors';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { PackageActions } from './store/actions';
import { fromLogin } from '../login/store/selectors';
import { PackageModel } from './package.model';
import { PackagesService } from './services/packages.service';
import { truncateText } from '../shared/utils/truncate-text';

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

  public deletingIdPackage: string = '';

  faPlusCircle = faPlusCircle;
  faTrashAlt = faTrashAlt;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store,
    private packagesService: PackagesService
  ) {
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
        this.packages = packages.packages;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goToNewPackage() {
    this.router.navigate(['admin/paquetes', 'nuevo-paquete']);
  }

  getPackageImage(images: string[]): string {
    console.log('images', images);
    if (images.length > 0 || !images) {
      return `https://garbrix.com/images/${images[0]}`;
    } else {
      console.log('No image found');
      return 'https://static.thenounproject.com/png/3314673-200.png';
    }
  }

  truncateText(text: string, limit: number): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  deletingPackage(id: number) {
    this.deletingIdPackage = id.toString();
  }

  deletePackage() {
    this.store.dispatch(
      PackageActions.deletePackage({ id: this.deletingIdPackage })
    );
  }

  goToEditPackage(id: number) {
    this.router.navigate(['admin/paquetes', 'editar-paquete', id]);
  }
}
