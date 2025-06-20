import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://localhost:7069/api/Student';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

    getStudentByEmail(email: string): Observable<any> {
    // codifico email in %40 e via query string
    const encoded = encodeURIComponent(email);
    return this.http.get(
      `${this.apiUrl}/byEmail?email=${encoded}`,
      { headers: this.getHeaders() }
    );
  }


  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getStudentGrades(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/grades`, { headers: this.getHeaders() });
  }

  getStudentCourses(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/courses`, { headers: this.getHeaders() });
  }

  getStudentExams(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/examregistrations`, { headers: this.getHeaders() });
  }

  getStudentStatistics(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/statistics`, { headers: this.getHeaders() });
  }

  getAvailableCourses(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${id}/availablecourses`,
      { headers: this.getHeaders() }
    );
  }

// 2) Iscrizione a corso
  enrollCourse(studentId: number, courseId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${studentId}/enrollcourse/${courseId}`,
      null,
      { headers: this.getHeaders() }
    );
  }

  
}