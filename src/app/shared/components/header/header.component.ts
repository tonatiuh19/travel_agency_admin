import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faChevronCircleDown,
  faStore,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  faChevronCircleDown = faChevronCircleDown;
  faStore = faStore;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }

  ngOnInit() {}

  onModalSave() {
    console.log('open modal');
  }
}
