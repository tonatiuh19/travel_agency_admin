import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getTodayDate } from '../../../shared/utils/get-date';
import { Store } from '@ngrx/store';
import { PackageActions } from '../../store/actions';
import { fromPackage } from '../../store/selectors';
import { fromLogin } from '../../../login/store/selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-full-screen-wizard-new-package',
  templateUrl: './full-screen-wizard-new-package.component.html',
  styleUrl: './full-screen-wizard-new-package.component.css',
})
export class FullScreenWizardNewPackageComponent implements OnInit {
  public selectIsLoading$ = this.store.select(fromPackage.selectIsLoading);

  public selectUserId$ = this.store.select(fromLogin.selectUserId);

  wizardForm: FormGroup = new FormGroup({});

  showTransportSection = true;

  currentStep = 1;

  todayDate = getTodayDate();

  steps = [
    {
      title: 'Información del paquete',
      fields: [
        {
          name: 'name',
          label: '¿Cual es el nombre del paquete?',
          hint: 'Ejemplo: Paquete para conocer Lagos de Moreno',
          type: 'text',
          validators: [Validators.required],
          error: 'Name is required.',
        },
        {
          name: 'price',
          label: '¿Cual es el precio del paquete?',
          hint: 'Ejemplo: 1000',
          type: 'number',
          specialType: 'currency',
          validators: [Validators.required],
          error: 'Name is required.',
        },
        {
          name: 'location',
          label: 'Selecciona el lugar de destino:',
          hint: 'Ejemplo: 1000',
          type: 'location',
          validators: [Validators.required],
          error: 'La ciudad es requerida.',
        },
        {
          name: 'date',
          label: '¿Cual es el rango de fechas del paquete?',
          hint: 'Ejemplo: 1000',
          type: 'date',
          validators: [Validators.required],
          error: 'El rango de fechas es requerido.',
        },
        {
          name: 'transport',
          label: '¿El paquete incluye transporte?',
          hint: '',
          type: 'select',
          options: [
            { label: 'Si', value: '1' },
            { label: 'No', value: '0' },
          ],
          validators: [Validators.required],
          error: 'Gender is required.',
        },
        {
          name: 'hosting',
          label: '¿El paquete incluye alojamiento?',
          hint: '',
          type: 'select',
          options: [
            { label: 'Si', value: '1' },
            { label: 'No', value: '0' },
          ],
          validators: [Validators.required],
          error: 'Gender is required.',
        },
        {
          name: 'limit',
          label: '¿Cual es el limite de personas?',
          hint: 'Ejemplo: 10',
          type: 'text',
          validators: [Validators.required],
          error: 'Name is required.',
        },
      ],
    },
    {
      title: 'Transporte',
      fields: [
        {
          name: 'transportType',
          label: '¿Que tipo de transporte incluye el paquete?',
          hint: '',
          type: 'select',
          options: [
            { label: 'Vuelos', value: '1' },
            { label: 'Trenes', value: '2' },
            { label: 'Autobuses', value: '3' },
            { label: 'Automóviles de alquiler', value: '4' },
            { label: 'Transporte marítimo', value: '5' },
            { label: 'Servicios de traslado', value: '6' },
          ],
          validators: [Validators.required],
          error: 'Gender is required.',
        },
        {
          name: 'transportDescription',
          label: '¿Que descripción le pondrías al transporte?',
          hint: 'Ejemplo: Paquete para conocer Guadalajara donde se incluye el transporte en avión y cuando llegues al destino se incluye el transporte en autobús.',
          type: 'text-area',
          validators: [Validators.required],
          error: 'Name is required.',
        },
      ],
    },
    {
      title: 'Hospedaje',
      fields: [
        {
          name: 'hostingType',
          label: '¿Que tipo de hospedaje incluye el paquete?',
          hint: '',
          type: 'select',
          options: [
            { label: 'Hoteles', value: '1' },
            { label: 'Apartamento', value: '2' },
            { label: 'Alojamiento en casas de huéspedes', value: '3' },
            { label: 'Hostales', value: '4' },
            { label: 'Resorts', value: '5' },
            { label: 'Cabañas', value: '6' },
            { label: 'Camping', value: '7' },
            { label: 'Villas', value: '8' },
          ],
          validators: [Validators.required],
          error: 'Gender is required.',
        },
        {
          name: 'hotelDescription',
          label: '¿Que descripción le pondrías al hospedaje?',
          hint: 'Ejemplo: Paquete para conocer Guadalajara donde se incluye el hospedaje en hoteles de 5 estrellas.',
          type: 'text-area',
          validators: [Validators.required],
          error: 'Name is required.',
        },
      ],
    },
    {
      title: 'Descripción del paquete',
      fields: [
        {
          name: 'generalDescription',
          label: '¿Que descripción total le pondrías al paquete?',
          hint: 'Ejemplo: Paquete para conocer Guadalajara donde se incluye el transporte en avión y cuando llegues al destino se incluye el transporte en autobús. Además se incluye el hospedaje en hoteles de 5 estrellas.',
          type: 'text-area',
          validators: [Validators.required],
          error: 'Name is required.',
        },
      ],
    },
    {
      title: 'Resumen del paquete',
      fields: [],
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.wizardForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      transport: ['', Validators.required],
      hosting: ['', Validators.required],
      limit: ['', Validators.required],
      transportType: ['', Validators.required],
      transportDescription: ['', Validators.required],
      hostingType: ['', Validators.required],
      hotelDescription: ['', Validators.required],
      generalDescription: ['', Validators.required],
    });

    this.wizardForm.get('transport')?.valueChanges.subscribe((value) => {
      this.filterTransportSteps(value);
    });

    this.wizardForm.get('hosting')?.valueChanges.subscribe((value) => {
      this.filterHostingSteps(value);
    });
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length && this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    const step = this.steps[this.currentStep - 1];
    return step.fields.every((field) => this.wizardForm.get(field.name)?.valid);
  }

  choosedDate(event: any) {
    this.wizardForm.get('date')?.setValue(event.chosenLabel);
  }

  choosedCity(event: any) {
    this.wizardForm.get('location')?.setValue(event);
  }

  onSubmit(): void {
    const userId = '';
    //if (this.wizardForm.valid) {
    this.selectUserId$.pipe(take(1)).subscribe((userId) => {
      userId = userId;

      this.store.dispatch(
        PackageActions.newPackage({
          packageEntity: {
            ...this.wizardForm.value,
            id_user: userId,
          },
        })
      );
      this.goBackToNewPackage();
    });
    //}
  }

  goBackToNewPackage() {
    this.router.navigate(['paquetes']);
  }

  filterTransportSteps(transportValue: string): void {
    if (transportValue === '0') {
      this.steps = this.steps.filter((step) => step.title !== 'Transporte');
    } else if (transportValue === '1') {
      const insertIndex = this.steps.length - 2;
      if (!this.steps.some((step) => step.title === 'Transporte')) {
        this.steps.splice(insertIndex, 0, {
          title: 'Transporte',
          fields: [
            {
              name: 'transportType',
              label: '¿Que tipo de transporte incluye el paquete?',
              hint: '',
              type: 'select',
              options: [
                { label: 'Vuelos', value: '1' },
                { label: 'Trenes', value: '2' },
                { label: 'Autobuses', value: '3' },
                { label: 'Automóviles de alquiler', value: '4' },
                { label: 'Transporte marítimo', value: '5' },
                { label: 'Servicios de traslado', value: '6' },
              ],
              validators: [Validators.required],
              error: 'Gender is required.',
            },
            {
              name: 'transportDescription',
              label: '¿Que descripción le pondrías al transporte?',
              hint: 'Ejemplo: Paquete para conocer Guadalajara donde se incluye el transporte en avión y cuando llegues al destino se incluye el transporte en autobús.',
              type: 'text-area',
              validators: [Validators.required],
              error: 'Name is required.',
            },
          ],
        });
      }
    } else {
      this.steps = [...this.steps];
    }
  }

  filterHostingSteps(hostingValue: string): void {
    if (hostingValue === '0') {
      this.steps = this.steps.filter((step) => step.title !== 'Hospedaje');
    } else if (hostingValue === '1') {
      const insertIndex = this.steps.length - 2;
      if (!this.steps.some((step) => step.title === 'Hospedaje')) {
        this.steps.splice(insertIndex, 0, {
          title: 'Hospedaje',
          fields: [
            {
              name: 'hostingType',
              label: '¿Que tipo de hospedaje incluye el paquete?',
              hint: '',
              type: 'select',
              options: [
                { label: 'Hoteles', value: '1' },
                { label: 'Apartamento', value: '2' },
                { label: 'Alojamiento en casas de huéspedes', value: '3' },
                { label: 'Hostales', value: '4' },
                { label: 'Resorts', value: '5' },
                { label: 'Cabañas', value: '6' },
                { label: 'Camping', value: '7' },
                { label: 'Villas', value: '8' },
              ],
              validators: [Validators.required],
              error: 'Gender is required.',
            },
            {
              name: 'hotelDescription',
              label: '¿Que descripción le pondrías al hospedaje?',
              hint: 'Ejemplo: Paquete para conocer Guadalajara donde se incluye el hospedaje en hoteles de 5 estrellas.',
              type: 'text-area',
              validators: [Validators.required],
              error: 'Name is required.',
            },
          ],
        });
      }
    } else {
      this.steps = [...this.steps];
    }
  }

  getTransportValue(type: string): string {
    const transportTypes: { [key: string]: string } = {
      '1': 'Vuelos',
      '2': 'Trenes',
      '3': 'Autobuses',
      '4': 'Automóviles de alquiler',
      '5': 'Transporte marítimo',
      '6': 'Servicios de traslado',
    };

    return transportTypes[type] || '';
  }

  getHostingValue(type: string): string {
    const hostingTypes: { [key: string]: string } = {
      '1': 'Hoteles',
      '2': 'Apartamento',
      '3': 'Alojamiento en casas de huéspedes',
      '4': 'Hostales',
      '5': 'Resorts',
      '6': 'Cabañas',
      '7': 'Camping',
      '8': 'Villas',
    };

    return hostingTypes[type] || '';
  }
}
