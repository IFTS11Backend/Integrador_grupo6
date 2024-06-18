
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CategoriaDetalleComponent } from '../categoria-detalle/categoria-detalle.component';
import { ITurno } from '../../interfaces/ITurno';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TurnoDbService } from '../../servicios/turno.db.service';
import { TurnoService } from '../../servicios/turno.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salonespera',
  standalone: true,
  imports: [HeaderComponent, RouterLink, CategoriaDetalleComponent, CommonModule],
  templateUrl: './salonespera.component.html',
  styleUrl: './salonespera.component.css',
})
export class SalonesperaComponent implements OnInit, OnDestroy {
  vistaHeader = true; //para ver el header condicionalmente
  url: string = ''; //Ejemplo: localhost:.../salon

  turno: any = {}; //turno seleccionado

  turnos: ITurno[] = []; //todos los turnos


  constructor(
    private route: ActivatedRoute,
    private turnoDbService: TurnoDbService,
    private turnoService : TurnoService
  ) {
    this.url = this.route.snapshot.url[0].path;
    console.log('url', this.url);
  }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.loadTurnos();
    })
  }

  ngOnDestroy(): void {

  }

  loadTurnos(): void {
    this.turnoDbService.listaTurnos$.subscribe((data: ITurno[]) => {
      console.log("Cargando turnos..");
      try {
        if (data) {
          console.log(data);
          this.turnos = data;
        }
      } catch (error) {
        console.error('Error al cargar los turnos:', error);
      }
    });
  }

  /**
   *
   * @param id Desde el template capturamos el _id del item seleccionado y se muestran los detalles, tanto
   * en el template como en consola.
   */
  verTurnoDetalle(id: string): void {
    try {
      this.turnoService.getDataById(id).subscribe({
        next: (response) => {
          console.log('Turno obtenido:', response[0]);
          this.turno = response[0];
        },
        error: (error) => {
          console.error('Error al obtener turno:', error);
        }
      });
    } catch (error) {
      console.log('Error al obtener turno:', error);
    }
  }

  /**
   * Funcion 'helper' para indexar mejor los datos en el iterado del template
   * @param index
   * @param item
   * @returns
   */
  trackById(index: number, item: ITurno): string {
    return `Indice: ${index}, Id: ${item._id}`;
  }
}
