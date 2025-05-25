import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // aggiungi questa riga
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule , CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
  this.http.post<any>('https://localhost:7069/api/auth/login', {
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('email', this.email);
      // Reindirizza alla dashboard studente se il ruolo è studente
      if (res.role === 'Studente') {
        this.router.navigate(['/student-dashboard']);
      } else {
        this.router.navigate(['/welcome']);
      }
    },
    error: () => {
      this.error = 'Email o password errati';
    }
  });
}
}