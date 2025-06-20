import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent {
  @Input() isLeftSidebarCollapsed!: boolean;
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();
  items = [
    {
      routeLink: '/student-dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard',
    },
    {
      routeLink: '/available-courses',      
      icon: 'fal fa-book-open',
      label: 'Corsi disponibili',           
    },
    {
      routeLink: '/products',
      icon: 'fal fa-box-open',
      label: 'Products',
    },
    {
      routeLink: '/pages',
      icon: 'fal fa-file',
      label: 'Pages',
    },
    {
      routeLink: '/settings',
      icon: 'fal fa-cog',
      label: 'Settings',
    },
  ];

  constructor(private router: Router) {}

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}