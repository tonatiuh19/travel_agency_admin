import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer-reviewer',
  templateUrl: './footer-reviewer.component.html',
  styleUrl: './footer-reviewer.component.css',
})
export class FooterReviewerComponent {
  faHeart = faHeart;
}
