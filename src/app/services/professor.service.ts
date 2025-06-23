import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private base = 'https://localhost:7069/api/professor';

  constructor(private http: HttpClient) {}

  getRegistrationsToGrade() {
    return this.http.get<any[]>(`${this.base}/registrations/pending`);
  }

  setGrade(regId: number, grade: number) {
    return this.http.put<void>(
      `${this.base}/registrations/${regId}/grade`,
      grade,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  getMyCourses() {
    return this.http.get<any[]>(`${this.base}/mycourses`);
  }

  getGradesByCourse(courseId:number){
    return this.http.get<any[]>(`${this.base}/courses/${courseId}/grades`);
  }

  /**  ➜ adesso accetta anche name (obbligatorio) e isactive (opz.) */
  createSession(
    courseId: number,
    session: {
      name: string;
      examdate: string;             // ISO string da input type="datetime-local"
      registrationdeadline: string;
      isactive?: boolean;
    }
  ) {
    return this.http.post(
      `${this.base}/courses/${courseId}/examsessions`,
      session
    );
  }
}
