// src/app/professor-dashboard/professor-dashboard.component.ts
import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';          // ← CORRETTO
import { ProfessorService }       from '../services/professor.service';

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule                        // ← qui
  ],
  templateUrl: './professor-dashboard.component.html',
  styleUrls:   ['./professor-dashboard.component.css']
})
export class ProfessorDashboardComponent implements OnInit {
  pending: any[] = [];

  constructor(private svc: ProfessorService) {}

  ngOnInit() {
    this.svc.getRegistrationsToGrade().subscribe(res => this.pending = res);
  }

  save(r: any) {
    this.svc.setGrade(r.registrationid, r.tempGrade).subscribe(() => {
      r.status = 'Passed';
      r.grade  = r.tempGrade;
    });
  }
}
