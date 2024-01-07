import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-find-movies';

  lastScrollY: number = 0;
  @ViewChild('navbar') navbar!: ElementRef<HTMLElement>;

  @HostListener('window:scroll', ['$event'])
  handleScroll(event: Event) {
    console.log(this.navbar);
    if (window.scrollY === 0) {
      this.navbar.nativeElement.classList.remove('scroll-up');
      this.navbar.nativeElement.classList.remove('scroll-down');
    } else if (window.scrollY >= 0 && window.scrollY > this.lastScrollY) {
      this.navbar.nativeElement.classList.remove('scroll-up');
      this.navbar?.nativeElement.classList.add('scroll-down');
    } else if (window.scrollY >= 0 && window.scrollY < this.lastScrollY) {
      this.navbar?.nativeElement.classList.remove('scroll-down');
      this.navbar.nativeElement.classList.add('scroll-up');
    }

    this.lastScrollY = window.scrollY;
  }
}
