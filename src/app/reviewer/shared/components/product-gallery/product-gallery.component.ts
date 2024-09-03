import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.css',
})
export class ProductGalleryComponent implements OnInit {
  @Input() images: string[] = [];
  selectedImage!: string;

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 3,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  };

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.selectedImage = this.images[0];
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }
}
