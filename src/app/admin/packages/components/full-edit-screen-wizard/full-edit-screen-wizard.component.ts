import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromPackage } from '../../store/selectors';
import { fromLogin } from '../../../login/store/selectors';
import { Subject, take, takeUntil } from 'rxjs';
import { PackageActions } from '../../store/actions';
import { getTodayDate } from '../../../shared/utils/get-date';
import { PackageModel } from '../../package.model';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { fromSettings } from '../../../settings/store/selectors';
import { SettingsActions } from '../../../settings/store/actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-full-edit-screen-wizard',
  templateUrl: './full-edit-screen-wizard.component.html',
  styleUrl: './full-edit-screen-wizard.component.css',
})
export class FullEditScreenWizardComponent implements OnInit {
  public sanitizer!: DomSanitizer;
  public selectPackages$ = this.store.select(fromPackage.selectPackageState);
  public selectIsLoading$ = this.store.select(fromPackage.selectIsLoading);

  public selectHostings$ = this.store.select(fromSettings.selectHostings);
  public selectTransports$ = this.store.select(fromSettings.selectTransports);

  public selectUserId$ = this.store.select(fromLogin.selectUserId);

  public hostings = [] as any;
  public transports = [] as any;

  public enableRichEditor = true;

  public locationEntity = {
    id: 0,
    name: '',
  };
  public isLocationEditedSelected = false;

  public dateRangeLabel = '';
  public isDateRangeEditedSelected = false;

  public packageId: string | null = null;

  wizardForm: FormGroup = new FormGroup({});

  showTransportSection = true;

  currentStep = 1;

  todayDate = getTodayDate();

  fileError: string | null = null;

  selectedFile: File | null = null;

  faPencilAlt = faPencilAlt;

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
          error: 'La descripción del transporte es requerida.',
        },
        {
          name: 'hotelDescription',
          label: '¿Que descripción le pondrías al hospedaje?',
          hint: 'Ejemplo: Paquete para conocer Guadalajara donde se incluye el hospedaje en hoteles de 5 estrellas.',
          type: 'text-area',
          validators: [Validators.required],
          error: 'La descripción del alojamiento es requerida.',
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
          error: 'La descripción total del paquete es requerida.',
        },
      ],
    },
    {
      title: 'Resumen del paquete',
      fields: [],
    },
  ];

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
    this.store.dispatch(SettingsActions.getHostings());
    this.store.dispatch(SettingsActions.getTransports());

    this.selectHostings$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((hostings) => {
        this.hostings = hostings.hostings || [];
        const hostingOptions = this.hostings.map((hosting: any) => ({
          label: hosting.hotLabel,
          value: hosting.hotID.toString(),
        }));

        const hospedajeStep = this.steps.find(
          (step: any) => step.title === 'Hospedaje'
        );
        if (hospedajeStep) {
          const hostingTypeField = hospedajeStep.fields.find(
            (field: any) => field.name === 'hostingType'
          );
          if (hostingTypeField) {
            hostingTypeField.options = hostingOptions;
          }
        }
      });

    this.selectTransports$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((transports) => {
        this.transports = transports.transports || [];
        const transportOptions = this.transports.map((transport: any) => ({
          label: transport.transportLabel,
          value: transport.transportId.toString(),
        }));

        const transportStep = this.steps.find(
          (step: any) => step.title === 'Transporte'
        );
        if (transportStep) {
          const transportTypeField = transportStep.fields.find(
            (field: any) => field.name === 'transportType'
          );
          if (transportTypeField) {
            transportTypeField.options = transportOptions;
          }
        }
      });

    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const packID = params.get('id');
      this.packageId = packID;
      if (packID) {
        this.selectUserId$.pipe(take(1)).subscribe((userId) => {
          this.store.dispatch(
            PackageActions.getPackageById({
              userId: userId.toString(),
              packID: +packID,
            })
          );
        });
      } else {
        this.goBackToNewPackage();
      }
    });
    this.selectPackages$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((packages) => {
        this.editStepFields(packages.packages[0]);
      });

    this.wizardForm = this.fb.group({
      name: ['', Validators.required],
      //image: ['', Validators.required],
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  chossedEditorText(event: any, name: string) {
    this.wizardForm.get(name)?.setValue(event);
  }

  toggleRichEditor(enable: boolean): void {
    this.enableRichEditor = enable;
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileType = file.type;

      if (!this.isValidFileType(fileType)) {
        this.fileError = 'Only PNG, JPG, and JPEG files are allowed.';
        this.wizardForm.get('image')?.setErrors({ invalidFileType: true });
      } else {
        this.fileError = null;
        this.selectedFile = event.target.files[0];
      }
    }
  }

  onSubmit(): void {
    this.selectUserId$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(
        PackageActions.updatePackage({
          packageEntity: {
            ...this.wizardForm.value,
            id_user: userId,
            packID: this.packageId,
          },
        })
      );
      this.goBackToNewPackage();
    });
  }

  goBackToNewPackage() {
    this.router.navigate(['admin/paquetes']);
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

  getCityValue(id: string) {
    this.store.dispatch(PackageActions.getCityById({ citID: Number(id) }));
  }

  toogleEdition(fieldName: string): void {
    if (fieldName === 'location') {
      this.isLocationEditedSelected = true;
      this.wizardForm.get('location')?.setValue(null);
    } else if (fieldName === 'date') {
      this.isDateRangeEditedSelected = true;
      this.wizardForm.get('date')?.setValue(null);
    }
  }

  toggleCancelEdition(fieldName: string): void {
    if (fieldName === 'location') {
      this.isLocationEditedSelected = false;
      this.wizardForm.get('location')?.setValue(this.locationEntity.id);
      this.getCityValue(this.locationEntity.id.toString());
    } else if (fieldName === 'date') {
      this.isDateRangeEditedSelected = false;
      this.wizardForm.get('date')?.setValue(this.dateRangeLabel);
    }
  }

  private isValidFileType(fileType: string): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    return allowedTypes.includes(fileType);
  }

  private editStepFields(packageData: PackageModel): void {
    console.log('packageData', packageData);
    this.wizardForm.get('name')?.setValue(packageData.packTitle);
    this.wizardForm.get('price')?.setValue(packageData.packPrice);

    this.wizardForm.get('location')?.setValue(packageData.packLocationID);
    this.locationEntity.id = packageData.packLocationID;
    this.locationEntity.name = packageData.citName || '';

    this.wizardForm.get('date')?.setValue(packageData.packDateRange);
    this.dateRangeLabel = packageData.packDateRange;

    this.wizardForm.get('limit')?.setValue(packageData.packLimit);
    this.wizardForm
      .get('generalDescription')
      ?.setValue(packageData.packDescription);
    if (packageData.packHotelID !== 0) {
      this.wizardForm.get('hosting')?.setValue('1');
      this.wizardForm.get('hostingType')?.setValue(packageData.packHotelID);
      this.wizardForm
        .get('hotelDescription')
        ?.setValue(packageData.packHotelDescription);
    } else {
      this.wizardForm.get('hosting')?.setValue('0');
    }

    if (packageData.packTransportId !== 0) {
      this.wizardForm.get('transport')?.setValue('1');
      this.wizardForm
        .get('transportType')
        ?.setValue(packageData.packTransportId);
      this.wizardForm
        .get('transportDescription')
        ?.setValue(packageData.packTransportDescription);
    } else {
      this.wizardForm.get('transport')?.setValue('0');
    }
  }
}
