import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
})
export class PackagesComponent {
  faPlusCircle = faPlusCircle;

  constructor(private router: Router) {}

  goToNewPackage() {
    this.router.navigate(['paquetes', 'nuevo-paquete']);
  }
}
