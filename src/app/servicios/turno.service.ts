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

  getDataById(id : string): Observable<ITurno[]> {
    return this.http.get<ITurno[]>(`${this.apiTurnos}/${id}`);
  }

  postData(turno : Object): Observable<ITurno> {
    return this.http.post<ITurno>(`${this.apiTurnos}`, turno);
  }

  deleteData(id : number): Observable<void> {
    return this.http.delete<void>(`${this.apiTurnos}/${id}`);
  }

  resetTodos(): Observable<void> {
    return this.http.delete<void>(`${this.apiTurnos}/resetdia`);
  
  }
  
  updateData(turno: ITurno): Observable<string> {
    return this.http.put(`${this.apiTurnos}/${turno._id}`, turno, { responseType: 'text' });
  }

}
