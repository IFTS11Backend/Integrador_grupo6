import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private http: HttpClient){}
  private apiUrl: string = 'http://127.0.0.1';

 
  // POST

  //crear un turno
  //TODO: cambiar any por object o string
  crearTurno(nombre: string, categoria: string): Observable<any>{
    const param = new HttpParams()
    .set('nombre', nombre)
    .set('categoria', categoria);    
    return this.http.post<any>(`${this.apiUrl}/turno/crear/${nombre}/${categoria}`, param);
  }

  // GET

  //obtener TODOS los turnos de TODAS las categorias
  //TODO: cambiar el <any> por ITurno
  traerTodosLosTurnos():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/turno/proximos/`);
  }

  //obtener TODOS los turnos de UNA categoria especifica
  //TODO: cambiar el <any[]> por ITurno[]
  traerTurnosCategoriaEspecifica(categoria: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/turno/proximos/${categoria}`);
  }
  
  //obtener UN turno especifico de una categoria
  //TODO: cambiar string por ICategoria y number por ITurno
  traerTurnoID(categoria: string, turno: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/turno/proximo/${categoria}/${turno}`);
  }
  
  //resetear todos los turnos (sin distincion de categoria)
  //TODO: cambiar el <any> por ITurno
  resetTurnos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/turnos/limpiar`);
  }

  //limpiar todos los turnos segun categoria
  //TODO: cambiar el <any> por ICategoria
  limpiarTurnosPorCategoria(categoria: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/turnos/limpiar/${categoria}`);
  }

  
  // PUT

  //cambiar estado ATENDIENDO de un turno en una categoria
  cambiarEstadoAtendiendo(categoria: string, turno: number):Observable<any>{
    const param = new HttpParams()
    .set('categoria', categoria)
    .set('turno', turno);
    return this.http.put<any>(`${this.apiUrl}/turno/atendiendo/${categoria}/numero=${turno}`, param);
  }

  //cambiar estado ATENDIDO de un turno en una categoria
  cambiarEstadoAtendido(categoria: string, turno: number): Observable<any> {
    const param = new HttpParams()
      .set('categoria', categoria)
      .set('turno', turno);
    return this.http.put<any>(`${this.apiUrl}/turno/atendido/${categoria}/numero=${turno}`, param);
  }

  //cambiar estado CANCELAR de un turno en una categoria
  cambiarEstadoCancelar(categoria: string, turno: number): Observable<any> {
    const param = new HttpParams()
      .set('categoria', categoria)
      .set('turno', turno);
    return this.http.put<any>(`${this.apiUrl}/turno/atendido/${categoria}/numero=${turno}`, param);
  }

  
}
