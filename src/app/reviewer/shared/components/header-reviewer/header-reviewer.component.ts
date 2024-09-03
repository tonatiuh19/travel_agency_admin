import { Component, HostListener, Input } from '@angular/core';
import { faPlane, faBolt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-reviewer',
  templateUrl: './header-reviewer.component.html',
  styleUrl: './header-reviewer.component.css',
})
export class HeaderReviewerComponent {
  @Input() isMain = true;
  public isColorDark = true;

  faPlane = faPlane;
  faBolt = faBolt;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');

    const targetElement = document.getElementById('target-element');

    if (this.isMain) {
      if (navbar && targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top;
        const navbarHeight = navbar.offsetHeight;

        if (targetPosition <= navbarHeight) {
          this.isColorDark = false;
          navbar.classList.add('bg-primary');
        } else {
          this.isColorDark = true;
          navbar.classList.remove('bg-primary');
        }
      }
    } else {
      navbar ? navbar.classList.add('bg-primary') : null;
    }
  }
}
