import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-full-loading-mask',
  templateUrl: './full-loading-mask.component.html',
  styleUrl: './full-loading-mask.component.css',
})
export class FullLoadingMaskComponent {
  @Input() titleLoading = 'Cargando';
}
