import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { StudentService }    from '../services/student.service';

@Component({
  standalone: true,
  selector: 'app-gradebook',
  imports: [CommonModule],
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.css']
})
export class GradebookComponent implements OnInit {
  grades: any[]   = [];
  subjects: any[] = [];
  arithmeticAvg = 0;
  weightedAvg   = 0;
  stats?: { media: number; cfu: number };

  constructor(private svc: StudentService) {}

  ngOnInit() {
    const id = +localStorage.getItem('studentId')!;
    this.svc.getSubjects(id).subscribe(s => this.subjects = s);
    this.svc.getGrades(id).subscribe(g => {
      this.grades = g;
      const sum = g.reduce((acc,x)=>acc+x.grade,0);
      this.arithmeticAvg = g.length ? sum/g.length : 0;

      let totC=0, wSum=0;
      g.forEach(x=>{
        const cfu = this.subjects.find(s=>s.name===x.subject)?.credits||0;
        totC += cfu; wSum += cfu*x.grade;
      });
      this.weightedAvg = totC ? wSum/totC : 0;
    });
    this.svc.getStatistics(id).subscribe(s => this.stats = s);
  }
}
