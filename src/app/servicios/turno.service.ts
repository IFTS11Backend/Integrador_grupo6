import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITurno } from '../interfaces/ITurno';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  constructor(private http: HttpClient) {}

  // private apiTurnos = 'http://localhost:3000/turnos'; //json-server
  private apiTurnos = 'http://localhost:3000/api/turneroweb'; //api

  getData(): Observable<ITurno[]> {
    return this.http.get<ITurno[]>(`${this.apiTurnos}`);
  }

  getDataById(id : number): Observable<ITurno> {
    return this.http.get<ITurno>(`${this.apiTurnos}/${id}`);
  }

  postData(turno : ITurno): Observable<string> {
    return this.http.post(`${this.apiTurnos}`, turno, { responseType: 'text' });
  }

  deleteData(id : number): Observable<void> {
    return this.http.delete<void>(`${this.apiTurnos}/${id}`);
  }
  
  updateData(turno: ITurno): Observable<string> {
    return this.http.put(`${this.apiTurnos}/${turno._id}`, turno, { responseType: 'text' });
  }
  // updateData(turno : ITurno) : Observable<ITurno> {
  //   return this.http.put<ITurno>(`${this.apiTurnos}/${turno._id}`, turno);
  // }

}
