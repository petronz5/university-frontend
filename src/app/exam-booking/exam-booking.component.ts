// src/app/exam-booking/exam-booking.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { StudentService }    from '../services/student.service';
import { map }               from 'rxjs/operators';

@Component({
  standalone: true,
  selector   : 'app-exam-booking',
  imports    : [CommonModule],
  templateUrl: './exam-booking.component.html',
  styleUrls  : ['./exam-booking.component.css']
})
export class ExamBookingComponent implements OnInit {

  availableExams: any[] = [];
  registrations : any[] = [];

  private studentId = +localStorage.getItem('studentId')!;

  constructor(private svc: StudentService) {}

  ngOnInit() {
    this.loadLists();
  }

  /* ---------- azioni ---------- */

  bookExam(sessionId: number) {
    this.svc.registerExam(this.studentId, sessionId).subscribe(() => this.loadLists());
  }

  cancelExam(sessionId: number) {
    this.svc.unregisterExam(this.studentId, sessionId).subscribe(() => this.loadLists());
  }

  /* ---------- helpers ---------- */

  isBeforeDeadline(deadline: string) {
    return new Date() < new Date(deadline);
  }

  private loadLists() {
    this.svc.getAvailableExams(this.studentId)
            .subscribe(list => this.availableExams = list);

    this.svc.getRegistrations(this.studentId).pipe(
      map(r => r.filter((x: any) => x.status === 'Registered'))
    ).subscribe(r => this.registrations = r);
  }
}
