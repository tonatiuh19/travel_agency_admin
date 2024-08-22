import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-screen-wizard-new-package',
  templateUrl: './full-screen-wizard-new-package.component.html',
  styleUrl: './full-screen-wizard-new-package.component.css',
})
export class FullScreenWizardNewPackageComponent implements OnInit {
  wizardForm: FormGroup = new FormGroup({});

  currentStep = 1;

  steps = [
    {
      title: 'Información del paquete',
      fields: [
        {
          name: 'name',
          label: '¿Cual es el nombre del paquete?',
          type: 'text',
          validators: [Validators.required],
          error: 'Name is required.',
        },
        {
          name: 'price',
          label: '¿Cual es el precio del paquete?',
          type: 'number',
          specialType: 'currency',
          validators: [Validators.required],
          error: 'Name is required.',
        },
        {
          name: 'transport',
          label: '¿El paquete incluye transporte?',
          type: 'select',
          options: [
            { label: 'Si', value: true },
            { label: 'No', value: false },
          ],
          validators: [Validators.required],
          error: 'Gender is required.',
        },
      ],
    },
    {
      title: 'Step 2 (Optional)',
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          validators: [Validators.email],
          error: 'Enter a valid email.',
        },
      ],
    },
    {
      title: 'Step 3',
      fields: [
        {
          name: 'password',
          label: 'Password',
          type: 'text',
          validators: [Validators.required],
          error: 'Password is required.',
        },
      ],
    },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.wizardForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      transport: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  nextStep(): void {
    console.log('Current Step:', this.wizardForm.get('name'));
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

  onSubmit(): void {
    if (this.wizardForm.valid) {
      console.log('Form Submitted', this.wizardForm.value);
    }
  }

  goBackToNewPackage() {
    this.router.navigate(['paquetes']);
  }
}
