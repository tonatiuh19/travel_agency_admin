import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barcode-generator',
  templateUrl: './barcode-generator.component.html',
  styleUrl: './barcode-generator.component.css',
})
export class BarcodeGeneratorComponent {
  @Input() barcodeValue!: string;
}
