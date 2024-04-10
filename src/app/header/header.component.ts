import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNavHidden: boolean = false;
  lastScrollTop: number = 0;

  constructor() {}


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > this.lastScrollTop && currentScroll > 50) {
      this.isNavHidden = true;
    } else {
      this.isNavHidden = false;
    }
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
