import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ITurno } from '../../interfaces/ITurno';
import { TurnoService } from '../../servicios/turno.service';
import { TurnoDbService } from '../../servicios/turno.db.service';

@Component({
  selector: 'app-categoria-detalle',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './categoria-detalle.component.html',
  styleUrl: './categoria-detalle.component.css',
})
export class CategoriaDetalleComponent implements OnInit {
  categoria: string = ''; //Ejemplo: localhost:.../.../categoria/perros...vacunacion...etc
  id: string = ''; //Ejemplo: localhost:.../.../1234
  url: string = ''; //Ejemplo: localhost:.../seguridad

  turnos: ITurno[] = []; //todos los turnos
  turnosFiltrados: ITurno[] = []; //filtra los objetos coincidentes con la categoria especifica

  turno: any = {}; //turno seleccionado


  constructor(
    private route: ActivatedRoute,
    private turnoService: TurnoService,
    private router: Router,
    private turnoDbService: TurnoDbService
  ) {
    this.url = this.route.snapshot.url[0].path;
    console.log('url', this.url);
  }

  /**
   * Obtenemos por suscripción los parámetros de la URL
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoria = params['nombre'];
      // this.id = params['id'];
      // console.log('categoria', this.categoria);
      this.loadTurnos();
    });
  }
  
  setTurnoSelected(): void {
    this.turnoDbService.turnoSelectedSubject.next(this.turno);
  }
  
  /**
   * Cargamos los turnos desde el servicio de la api (turnoService) en principio, para luego
   * trabajar sobre eventos que emulan las acciones con una base de datos.
   */
  loadTurnos(): void {
    this.turnoDbService.listaTurnos$.subscribe((data: ITurno[]) => {
      try {
        if (data) {
          this.turnos = data;
          if (this.categoria) {
            this.verTurnosPorCategoria(this.categoria);
          }
        }
      } catch (error) {
        console.error('Error al cargar los turnos:', error);
      }
    });
  }

  /**
   *
   * @param categoria Desde el template capturamos la categoria del item seleccionado y se muestran, tanto
   * en el template como en consola.
   */
  verTurnosPorCategoria(categoria: string) {
    try {
      this.turnosFiltrados = this.turnos.filter(
        (turno) => turno.categoria === categoria
      );
    } catch (error) {
      console.log('Error al filtrar los turnos por categoria:', error);
    }
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
          // console.log('Turno obtenido:', response[0]);
          this.turno = response[0];
          this.setTurnoSelected();
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
