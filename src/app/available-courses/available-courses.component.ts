import { Component, OnInit } from '@angular/core';
import { StudentService }     from '../services/student.service';
import { Router }             from '@angular/router';

@Component({
  selector: 'app-available-courses',
  templateUrl: './available-courses.component.html',
  styleUrls: ['./available-courses.component.css'],
  standalone: true
})
export class AvailableCoursesComponent implements OnInit {
  courses: any[] = [];
  studentId!: number;
  error = '';
  
  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}
  
  ngOnInit() {
    const email = localStorage.getItem('email');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }
    // Prima prendi l’ID dello studente
    this.studentService.getStudentByEmail(email).subscribe({
      next: stud => {
        this.studentId = stud.studentid;
        this.loadCourses();
      },
      error: () => this.error = 'Impossibile caricare i dati studente'
    });
  }
  
  loadCourses() {
    this.studentService.getAvailableCourses(this.studentId)
      .subscribe({
        next: data => this.courses = data,
        error: () => this.error = 'Errore caricamento corsi'
      });
  }
  
  onEnroll(course: any) {
    this.studentService.enrollCourse(this.studentId, course.courseid)
      .subscribe({
        next: () => {
          alert(`Iscritto a ${course.subject}`);
          this.loadCourses();
        },
        error: err => {
          console.error(err);
          this.error = err.error?.detail || 'Errore iscrizione';
        }
      });
  }
}
