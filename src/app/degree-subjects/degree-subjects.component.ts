// src/app/degree-subjects/degree-subjects.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { ProfessorService }  from '../services/professor.service';
import { StudentService }    from '../services/student.service';
import { RoleService }       from '../services/role.service';

@Component({
  standalone: true,
  selector: 'app-degree-subjects',
  imports: [CommonModule, FormsModule],
  templateUrl: './degree-subjects.component.html',
  styleUrls:  ['./degree-subjects.component.css']
})
export class DegreeSubjectsComponent implements OnInit {
  role     = '';
  subjects: any[] = [];
  courses:  any[] = [];

  // campi per la form di creazione sessione
  newName = '';
  newDate = '';
  newDead = '';

  constructor(
    private roleSvc:    RoleService,
    private studentSvc: StudentService,
    private profSvc:    ProfessorService
  ) {}

  ngOnInit() {
    this.role = this.roleSvc.getRole();

    if (this.role === 'Studente') {
      const id = +localStorage.getItem('studentId')!;
      this.studentSvc.getSubjects(id)
        .subscribe(subs => this.subjects = subs);
    }

    else if (this.role === 'Professore') {
      this.profSvc.getMyCourses()
        .subscribe(cs => this.courses = cs);
    }
  }

  addSession(course: any) {
    if (!this.newName || !this.newDate || !this.newDead) return;

    const payload = {
      name:                 this.newName,
      examdate:             this.newDate,
      registrationdeadline: this.newDead,
      isactive:             true
    };

    this.profSvc.createSession(course.courseid, payload)
      .subscribe({
        next: () => {
          alert('Sessione creata ✔︎');
          this.newName = this.newDate = this.newDead = '';
        },
        error: err => {
          const msg = err.error?.title ?? err.message;
          alert('Errore: ' + msg);
        }
      });
  }
}
