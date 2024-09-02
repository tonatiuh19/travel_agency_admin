import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { SettingsActions } from './store/actions';
import { fromSettings } from './store/selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  public selectCountries$ = this.store.select(fromSettings.selectCountries);
  public selectCities$ = this.store.select(fromSettings.selectCities);
  public selectHostings$ = this.store.select(fromSettings.selectHostings);
  public selectTransports$ = this.store.select(fromSettings.selectTransports);

  public countries = [] as any;
  public cities = [] as any;
  public hostings = [] as any;
  public transports = [] as any;

  public isLoading = true;

  currentItemType!: string;
  addItemForm!: FormGroup;
  continentOptions: { id: number; name: string }[] = [
    { id: 1, name: 'Asia' },
    { id: 2, name: 'Europe' },
    { id: 3, name: 'North America' },
    { id: 4, name: 'South America' },
    { id: 5, name: 'Africa' },
    { id: 6, name: 'Australia' },
    { id: 7, name: 'Antarctica' },
  ];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store,
    private settingsService: SettingsService,
    private fb: FormBuilder
  ) {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      extraSelect: [''],
    });
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.store.dispatch(SettingsActions.getCountries());
    this.store.dispatch(SettingsActions.getCities());
    this.store.dispatch(SettingsActions.getHostings());
    this.store.dispatch(SettingsActions.getTransports());

    this.selectCountries$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((countries) => {
        this.isLoading = !countries.isLoading;
        this.countries = countries.countries || [];
      });

    this.selectCities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cities) => {
        this.isLoading = !cities.isLoading;
        this.cities = cities.cities || [];
      });

    this.selectHostings$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((hostings) => {
        this.isLoading = !hostings.isLoading;
        this.hostings = hostings.hostings || [];
      });

    this.selectTransports$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((transports) => {
        this.isLoading = !transports.isLoading;
        this.transports = transports.transports || [];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openModal(itemType: string): void {
    this.currentItemType = itemType;
    this.updateFormValidators();
    const modalElement = document.getElementById('addItemModal');

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      const item = this.addItemForm.value;
      switch (this.currentItemType) {
        case 'Pais':
          this.store.dispatch(SettingsActions.addCountry({ country: item }));
          break;
        case 'Ciudad':
          this.store.dispatch(SettingsActions.addCity({ city: item }));
          break;
        case 'Transporte':
          this.store.dispatch(
            SettingsActions.addTransport({ transport: item })
          );
          break;
        case 'Hospedaje':
          this.store.dispatch(SettingsActions.addHosting({ hosting: item }));
          break;
      }

      this.addItemForm.reset();
      const modalElement = document.getElementById('addItemModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    }
  }

  private updateFormValidators(): void {
    const extraSelectControl = this.addItemForm.get('extraSelect');
    if (this.currentItemType === 'Pais' || this.currentItemType === 'Ciudad') {
      extraSelectControl?.setValidators([Validators.required]);
    } else {
      extraSelectControl?.clearValidators();
    }
    extraSelectControl?.updateValueAndValidity();
  }
}
