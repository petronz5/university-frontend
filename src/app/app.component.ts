import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet , LeftSidebarComponent, CommonModule],
})
export class AppComponent {
  isLeftSidebarCollapsed = false;
  title = 'university-frontend';
  currentUrl = '';
  

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  isLoginPage(): boolean {
    return this.currentUrl === '/' || this.currentUrl.startsWith('/login');
  }
}