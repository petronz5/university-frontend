// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.http
      .post<{ token: string; role: string; studentId?: number }>(
        'https://localhost:7069/api/auth/login',
        { email: this.email, password: this.password }
      )
      .subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role',  res.role);
          localStorage.setItem('email', this.email);
          if (res.studentId != null) {
            localStorage.setItem('studentId', res.studentId.toString());
          }

          if (res.role === 'Studente') {
            this.router.navigate(['/student-dashboard']);
          } else {
            this.router.navigate(['/professor-dashboard']);
          }
        },
        error: () => {
          this.error = 'Email o password errati';
        }
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
