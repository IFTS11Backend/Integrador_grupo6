import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TurnoService } from './turno.service';
import { ITurno } from '../interfaces/ITurno';

@Injectable({
  providedIn: 'root'
})
export class TurnoDbService {

  private listaTurnosSubject = new BehaviorSubject<ITurno[]>([]);
  listaTurnos$ = this.listaTurnosSubject.asObservable();

  constructor(private turnoService: TurnoService) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.turnoService.getData().subscribe(turnos => {
      this.listaTurnosSubject.next(turnos);
    });
  }

  getTurnos(): Observable<ITurno[]> {
    return this.listaTurnos$;
  }

 updateTurno(turno: ITurno): void {
    this.turnoService.updateData(turno).subscribe(response => {
      console.log('Respuesta de actualización:', response);
      this.loadInitialData();
    }, error => {
      console.error('Error actualizando el turno:', error);
    });
  }
  // updateTurno(turno: ITurno): void {
  //   this.turnoService.updateData(turno).subscribe(() => {
  //     this.loadInitialData();
  //   });
  // }
}