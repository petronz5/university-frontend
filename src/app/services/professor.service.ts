import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private base = 'https://localhost:7069/api/professor';

  constructor(private http: HttpClient) {}

  /** esami ancora da valutare del docente loggato */
  getRegistrationsToGrade(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/pending`);
  }

  /** registra il voto definitvo */
  setGrade(regId:number, grade:number): Observable<void> {
    return this.http.put<void>(`${this.base}/grade/${regId}`, { grade });
  }
}
