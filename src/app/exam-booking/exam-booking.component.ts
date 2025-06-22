import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { StudentService }    from '../services/student.service';
import { map }               from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-exam-booking',
  imports: [CommonModule],
  templateUrl: './exam-booking.component.html',
  styleUrls: ['./exam-booking.component.css']
})
export class ExamBookingComponent implements OnInit {
  availableExams: any[] = [];
  registrations: any[]  = [];

  constructor(private svc: StudentService) {}

  ngOnInit() {
    const id = +localStorage.getItem('studentId')!;
    this.svc.getAvailableExams(id).subscribe(ex => this.availableExams = ex);
    this.svc.getRegistrations(id).pipe(
      map(list => list.filter(r => r.status==='Registered'))
    ).subscribe(r => this.registrations = r);
  }

  bookExam(sessionId: number) {
    const id = +localStorage.getItem('studentId')!;
    this.svc.registerExam(id, sessionId).subscribe(() => {
      this.availableExams = this.availableExams.filter(e => e.examsessionid !== sessionId);
      this.registrations.push({ examsession: { examsessionid: sessionId }, status: 'Registered' });
    });
  }
}
