import { Component, OnInit } from '@angular/core';
import { Router, RouterModule }            from '@angular/router';
import { HttpClient }        from '@angular/common/http';
import { FormsModule }       from '@angular/forms';
import { CommonModule }      from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class RegisterComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  degreeCourseId = 1;
  error = '';
  success = '';
  degreeCourses: { degreecourseid: number; name: string }[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // facoltativo: recupera i corsi di laurea per popolare un dropdown
    this.http
      .get<{ degreecourseid: number; name: string }[]>(
        'https://localhost:7069/api/degreecourse'
      )
      .subscribe({
        next: list => (this.degreeCourses = list),
        error: () => { /* ignora errori qui */ }
      });
  }

  onSubmit() {
    this.error = '';
    this.success = '';
    const payload = {
      FirstName:       this.firstName,
      LastName:        this.lastName,
      Email:           this.email,
      Password:        this.password,
      DegreeCourseId:  this.degreeCourseId
    };
    this.http
      .post('https://localhost:7069/api/auth/register-student', payload)
      .subscribe({
        next: () => {
          this.success = 'Registrazione avvenuta con successo!';
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error: err => {
          this.error = err.error || 'Errore durante la registrazione';
        }
      });
  }
}
