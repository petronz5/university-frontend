import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ProfessorService }  from '../services/professor.service';

@Component({
  standalone : true,
  selector   : 'app-prof-register',
  templateUrl: './prof-register.component.html',
  styleUrls  : ['./prof-register.component.css'],
  imports    : [CommonModule]
})
export class ProfRegisterComponent implements OnInit {

  courses:any[] = [];
  rows  :any[] = [];          // voti caricati per il corso selezionato

  constructor(private svc: ProfessorService) {}

  ngOnInit(): void {
    this.svc.getMyCourses().subscribe(c => this.courses = c);
  }

  loadGrades(courseId:number){
    this.svc.getGradesByCourse(courseId).subscribe(r => this.rows = r);
  }
}
