import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITurno } from '../interfaces/ITurno';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  constructor(private http: HttpClient) {}

  private apiTurnos = 'http://localhost:3000/turnos';

  getData(): Observable<ITurno[]> {
    return this.http.get<ITurno[]>(`${this.apiTurnos}`);
  }
}
