import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FullCalendarModule }   from '@fullcalendar/angular';
import { StudentService }       from '../services/student.service';

@Component({
  standalone:true,
  selector   :'app-exam-calendar',
  template   :`<full-calendar [events]="events"></full-calendar>`,
  imports    :[CommonModule, FullCalendarModule],
  schemas    :[CUSTOM_ELEMENTS_SCHEMA]          // evita l’errore “unknown element”
})
export class ExamCalendarComponent implements OnInit {
  events:any[] = [];
  constructor(private svc:StudentService){}
  ngOnInit(){
    const id = +localStorage.getItem('studentId')!;
    this.svc.getRegistrations(id).subscribe(list=>{
      this.events = list.map((r:any)=>({
        title: r.examsession.course.subject.name,
        date : r.examsession.examdate          // ISO-8601 richiesto da fullcalendar
      }));
    });
  }
}
