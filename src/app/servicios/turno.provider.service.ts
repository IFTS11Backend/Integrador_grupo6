import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITurno } from '../interfaces/ITurno';

@Injectable({
  providedIn: 'root',
})
export class TurnoProviderService {
  /**
   * Creamos un observable para la lista de turnos y otro para el turno seleccionado
   */
  private listaTurnosSubject = new BehaviorSubject<any>(null);
  listaTurnos$ = this.listaTurnosSubject.asObservable();

  private turnoSeleccionadoSubject = new BehaviorSubject<any>(null);
  turnoSeleccionado$ = this.turnoSeleccionadoSubject.asObservable();

  constructor() {
    //Mientras esté la lista de turnos en localStorage, la notificamos a los suscriptores
    const listaTurnos = localStorage.getItem('listaTurnos');
    if (listaTurnos) {
      this.listaTurnosSubject.next(JSON.parse(listaTurnos));
    }

    /**
     * Escuchamos los cambios en localStorage
     */
    window.addEventListener('storage', this.onStorageChange.bind(this));
  }

  /**   *
   * @param turno Guarda el turno seleccionado en localStorage
   */
  setTurnoSeleccionado(turno: ITurno): void {
    localStorage.setItem('turnoSeleccionado', JSON.stringify(turno));
    this.turnoSeleccionadoSubject.next(turno);

    // Actualiza la lista de turnos si el turno seleccionado cambia
    const listaTurnos = JSON.parse(localStorage.getItem('listaTurnos') || '[]');
    const turnoIndex = listaTurnos.findIndex(
      (t: ITurno) => t._id === turno._id
    );
    if (turnoIndex > -1) {
      listaTurnos[turnoIndex] = turno;
      this.setTurnos(listaTurnos); // Sobreescribe la lista
      this.listaTurnosSubject.next(listaTurnos); //notifica a los suscriptores
    }
  }

  /**
   * @param turnos Guarda la lista de turnos en localStorage
   */
  setTurnos(turnos: any): void {
    localStorage.setItem('listaTurnos', JSON.stringify(turnos));
    this.listaTurnosSubject.next(turnos);
  }

  /**
   *
   * @param event Escucha los cambios en localStorage con respecto a la clave 'turnoSeleccionado'
   * y 'listaTurnos' que notificara a los suscriptores
   */
  private onStorageChange(event: StorageEvent): void {
    if (event.key === 'turnoSeleccionado') {
      const turnoSeleccionado = localStorage.getItem('turnoSeleccionado');
      if (turnoSeleccionado) {
        this.turnoSeleccionadoSubject.next(JSON.parse(turnoSeleccionado));
      } else {
        this.turnoSeleccionadoSubject.next(null);
      }
    } else if (event.key === 'listaTurnos') {
      const listaTurnos = localStorage.getItem('listaTurnos');
      if (listaTurnos) {
        this.listaTurnosSubject.next(JSON.parse(listaTurnos));
      } else {
        this.listaTurnosSubject.next([]);
      }
    }
  }

  //remover todo del local storage
  resetTurnos() {
    localStorage.clear();
  }
}
