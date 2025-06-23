import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private platformId = inject(PLATFORM_ID);

  getRole(): string {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem('role') ?? ''
      : '';
  }

  isStudent(): boolean {
    return this.getRole() === 'Studente';
  }

  isProfessor(): boolean {
    return this.getRole() === 'Professore';
  }

  isRector(): boolean {
    return this.getRole() === 'Rettore';
  }
}
