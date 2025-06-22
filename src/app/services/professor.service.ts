import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private base = 'https://localhost:7069/api/professor';

  constructor(private http: HttpClient) {}

  getRegistrationsToGrade() {
    return this.http.get<any[]>(`${this.base}/registrations/pending`);
  }

  setGrade(regId: number, grade: number) {
    // invia il numero puro, non l’oggetto { grade }
    return this.http.put<void>(
      `${this.base}/registrations/${regId}/grade`,
      grade,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  getMyCourses() {
    return this.http.get<any[]>(`${this.base}/mycourses`); 
  }

  createSession(courseId:number, session:{ examdate:string; registrationdeadline:string }) {
    return this.http.post(`${this.base}/courses/${courseId}/examsessions`, session);
  }

}
