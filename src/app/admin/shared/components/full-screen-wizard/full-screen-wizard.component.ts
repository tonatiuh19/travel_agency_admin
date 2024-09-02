import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-full-screen-wizard',
  templateUrl: './full-screen-wizard.component.html',
  styleUrl: './full-screen-wizard.component.css',
})
export class FullScreenWizardComponent implements OnInit {
  wizardForm: FormGroup = new FormGroup({});

  currentStep = 1;

  steps = [
    {
      title: 'Step 1',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          validators: [Validators.required],
          error: 'Name is required.',
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    /* const formGroupConfig = this.steps.reduce((config, step) => {
      step.fields.forEach((field) => {
        config[field.name] = ['', field.validators];
      });
      return config;
    }, {});*/

    this.wizardForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
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

  onSubmit(): void {
    if (this.wizardForm.valid) {
      console.log('Form Submitted', this.wizardForm.value);
    }
  }
}
