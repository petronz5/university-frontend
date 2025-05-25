import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StudentDashboardComponent implements OnInit {
  student: any;
  grades: any[] = [];
  courses: any[] = [];
  exams: any[] = [];
  statistics: any;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      // Chiamo l'endpoint byEmail
      this.studentService.getStudentByEmail(userEmail).subscribe({
        next: (stud) => {
          this.student = stud;
          this.loadAdditionalData(stud.studentid);
        },
        error: err => console.error('Studente non trovato:', err)
      });
    } else {
      console.error('Nessuna email in localStorage');
    }
  }

  loadAdditionalData(studentId: number) {
    this.studentService.getStudentGrades(studentId).subscribe({
      next: data => this.grades = data,
      error: err => console.error(err)
    });
    this.studentService.getStudentCourses(studentId).subscribe({
      next: data => this.courses = data,
      error: err => console.error(err)
    });
    this.studentService.getStudentExams(studentId).subscribe({
      next: data => this.exams = data,
      error: err => console.error(err)
    });
    this.studentService.getStudentStatistics(studentId).subscribe({
      next: data => this.statistics = data,
      error: err => console.error(err)
    });
  }
}
