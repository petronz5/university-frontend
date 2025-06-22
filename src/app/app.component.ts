import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule, NgComponentOutlet } from '@angular/common';   // ⬅️
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgComponentOutlet,   
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  sidebar = SidebarComponent;        // la proprietà usata nel template
  currentUrl = '';

  constructor(private router: Router) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => (this.currentUrl = e.urlAfterRedirects));
  }

  isLoginPage(): boolean {
    return this.currentUrl === '/' || this.currentUrl.startsWith('/login');
  }
}
