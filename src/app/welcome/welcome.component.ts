import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class WelcomeComponent implements OnInit {
  role = '';
  name = '';

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.role = localStorage.getItem('role') ?? 'Studente';
      this.name = localStorage.getItem('name') ?? '';
    }
  }
}