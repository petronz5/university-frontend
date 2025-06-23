// src/app/grade-stats/grade-stats.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { NgChartsModule }    from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { StudentService }    from '../services/student.service';

@Component({
  standalone: true,
  selector  : 'app-grade-stats',
  template  : `
    <canvas baseChart
            [data]="chartData"
            [type]="'bar'">
    </canvas>`,
  imports   : [CommonModule, NgChartsModule]    //  ← ora valido
})
export class GradeStatsComponent implements OnInit {

  chartData: ChartConfiguration['data'] = {
    labels  : [],
    datasets: [{ label: 'Media', data: [] }]
  };

  constructor(private svc: StudentService) {}

  ngOnInit(): void {
    const id = +localStorage.getItem('studentId')!;
    this.svc.getGradeAnalytics(id).subscribe(res => {
      this.chartData.labels                  = res.map((x:any) => x.subject);
      (this.chartData.datasets[0].data as number[]) = res.map((x:any) => x.avg);
    });
  }
}
