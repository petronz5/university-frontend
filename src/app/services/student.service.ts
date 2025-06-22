// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private base = 'https://localhost:7069/api/Student';

  constructor(private http: HttpClient) {}

  getByEmail(email: string): Observable<any> {
    return this.http.get<any>(
      `${this.base}/byEmail?email=${encodeURIComponent(email)}`
    );
  }

  getCourses(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/${id}/courses`);
  }

  getGrades(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/${id}/grades`);
  }

  getStatistics(id: number): Observable<{ media: number; cfu: number }> {
    return this.http.get<{ media: number; cfu: number }>(
      `${this.base}/${id}/statistics`
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}`);
    }

    getExamRegistrations(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.base}/${id}/examregistrations`);
    }

    getAvailableCourses(id:number){
      return this.http.get<any[]>(`${this.base}/${id}/availablecourses`);
    }
    enrollCourse(studentId:number, courseId:number){
      return this.http.post(`${this.base}/${studentId}/enrollcourse/${courseId}`, null);
    }

    getSubjects(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.base}/${id}/subjects`);
    }

    getRegistrations(id:number){
      return this.http.get<any[]>(`${this.base}/${id}/examregistrations`);
    }

    getAvailableExams(id: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.base}/${id}/availableexams`);
    }

    registerExam(id: number, sessionId: number) {
      return this.http.post(`${this.base}/${id}/registerexam`, sessionId);
    }
    
    getDegreeCourse(id: number) {
      return this.http.get<any>(`${this.base}/${id}/degreecourse`);
    }

}
