import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { StudentService }    from '../services/student.service';
import { map }               from 'rxjs/operators';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  student: any;
  courses: any[]  = [];
  grades: any[]   = [];
  subjects: any[] = [];
  stats?: { media:number; cfu:number };

  registrations:    any[] = [];
  availableCourses: any[] = [];
  arithmeticAvg:   number = 0; 
  weightedAvg:     number = 0; 

  // **nuova lista** di esami prenotabili
  availableExams: any[] = [];

  constructor(private svc: StudentService) {}

  ngOnInit(): void {
    const id = +localStorage.getItem('studentId')!;

    // → corsi disponibili
    this.svc.getAvailableCourses(id).subscribe(c => this.availableCourses = c);

    // → esami prenotati imminenti
    this.svc.getRegistrations(id).pipe(
      map(list => list
        .filter(r => r.status==='Registered' &&
                     new Date(r.examsession.examdate) >= new Date())
        .sort((a,b)=> new Date(a.examsession.examdate).getTime() -
                     new Date(b.examsession.examdate).getTime())
        .slice(0,5)
      )
    ).subscribe(r => this.registrations = r);

    // → ESAMI DISPONIBILI (feature 1)
    this.svc.getAvailableExams(id).subscribe(e => this.availableExams = e);

    // → resto del profilo
    this.svc.getById(id).subscribe(stud => {
      this.student = stud;
      this.svc.getDegreeCourse(id).subscribe(dc => this.student.degreeCourse = dc);
      this.svc.getStatistics(id).subscribe(s => this.stats    = s);
      this.svc.getCourses(id)   .subscribe(c => this.courses  = c);
      this.svc.getGrades(id).subscribe(g => {
        this.grades = g
          .sort((a,b)=>new Date(b.examdate).getTime()-new Date(a.examdate).getTime())
          .slice(0,5);

        // media aritmetica
        const sum = this.grades.reduce((acc,x)=> acc + x.grade, 0);
        this.arithmeticAvg = this.grades.length
          ? sum/this.grades.length
          : 0;

        // media ponderata (usando CFU da subjects)
        let totalCredits = 0, weightedSum = 0;
        this.grades.forEach(g => {
          const subj = this.subjects.find(s=>s.name===g.subject);
          const cfu  = subj?.credits ?? 0;
          totalCredits += cfu;
          weightedSum  += g.grade * cfu;
        });
        this.weightedAvg = totalCredits
          ? weightedSum/totalCredits
          : 0;
      });
      this.svc.getSubjects(id)  .subscribe(sub => this.subjects = sub);
    });
  }

  // Iscrizione corso (esistente)
  enroll(courseId:number): void {
    const id = +localStorage.getItem('studentId')!;
    this.svc.enrollCourse(id, courseId)
      .subscribe(() => this.availableCourses =
        this.availableCourses.filter(c => c.courseid !== courseId));
  }

  bookExam(sessionId: number): void {
    const id = +localStorage.getItem('studentId')!;
    this.svc.registerExam(id, sessionId).subscribe(() => {
      // rimuove dall’elenco disponibili
      this.availableExams = this.availableExams
        .filter(e => e.examsessionid !== sessionId);
      // (ri)carica esami prenotati
      this.svc.getRegistrations(id).pipe(
        map(list => list
          .filter(r =>
            r.status === 'Registered' &&
            new Date(r.examsession.examdate) >= new Date()
          )
          .sort((a,b) =>
            new Date(a.examsession.examdate).getTime() -
            new Date(b.examsession.examdate).getTime()
          )
          .slice(0,5)
        )
      ).subscribe(reg => this.registrations = reg);
    });
  }
}
