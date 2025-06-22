import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleService }  from '../services/role.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showConfirm = false;

  constructor(
    public roleService: RoleService,
    private router: Router
  ) {}

  confirmLogout(): void {
    this.showConfirm = true;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  cancel(): void {
    this.showConfirm = false;
  }
}
