import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CTurno, ITurno } from '../interfaces/ITurno';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  constructor(private http: HttpClient) {}

  // private apiTurnos = 'http://localhost:3000/turnos';
  private turnero = 'http://localhost:3000/api/turneroweb';

  getData(): Observable<ITurno[]> {
    return this.http.get<ITurno[]>(`${this.turnero}`);
  }

  crearTurno(turno: CTurno): Observable<CTurno> {
    console.log('Turno:', turno);
    return this.http.post<CTurno>(`${this.turnero}`, turno, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
/*
  getDataById(id: number): Observable<ITurno> {
    return this.http.get<ITurno>(`${this.turnero}/${id}`);
  }

  postData(turno: ITurno): Observable<ITurno> {
    return this.http.post<ITurno>(`${this.turnero}`, turno, {});
  }

  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.turnero}/${id}`);
  }

  updateData(turno: ITurno): Observable<string> {
    return this.http.put(`${this.turnero}/${turno._id}`, turno, {
      responseType: 'text',
    });
  }

  getByCategory(category: string): Observable<ITurno[]> {
    return this.http.get<ITurno[]>(`${this.turnero}/categoria/${category}`);
  }
    */
}
