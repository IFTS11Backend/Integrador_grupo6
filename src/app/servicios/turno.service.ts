import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITurno } from '../interfaces/ITurno';
import { CTurno } from '../interfaces/CTurno';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  constructor(private http: HttpClient) {}

  private apiTurnos = 'http://localhost:3000/turnos';
  private apiturneroweb = 'http://localhost:3000//api/turneroweb';

  getData(): Observable<ITurno[]> {
    return this.http.get<ITurno[]>(`${this.apiTurnos}`);
  }

  postData(turno:CTurno): Observable<string> {
    return this.http.post(`${this.apiturneroweb}`, turno, { responseType: 'text' });
  }

}
