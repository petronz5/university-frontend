import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { StudentService }    from '../services/student.service';
import { ProfessorService }  from '../services/professor.service';
import { RoleService }       from '../services/role.service';
import { FormsModule }       from '@angular/forms';          // per input type="datetime-local"

@Component({
  standalone: true,
  selector: 'app-degree-subjects',
  imports: [CommonModule, FormsModule],
  templateUrl: './degree-subjects.component.html',
  styleUrls:  ['./degree-subjects.component.css']
})
export class DegreeSubjectsComponent implements OnInit {
  role: 'Studente' | 'Professore' = 'Studente';   // default
  courses: any[] = [];
  newDate = ''; newDead = '';

  constructor(
      private stuSvc: StudentService,
      private profSvc: ProfessorService,
      private roleService: RoleService) {}

  ngOnInit() {
    this.role = this.roleService.isProfessor() ? 'Professore' : 'Studente';

    if (this.role === 'Professore') {
      this.profSvc.getMyCourses().subscribe(c => this.courses = c);
    } else {
      const id = +localStorage.getItem('studentId')!;
      this.stuSvc.getCourses(id).subscribe(c => this.courses = c);
    }
  }

  addSession(c:any) {
    this.profSvc.createSession(c.courseid,{
      examdate:             this.newDate,
      registrationdeadline: this.newDead
    }).subscribe(()=> alert('Sessione creata!'));
  }
}

