import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ITurno } from '../../interfaces/ITurno';
import { TurnoService } from '../../servicios/turno.service';

@Component({
  selector: 'app-categoria-detalle',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './categoria-detalle.component.html',
  styleUrl: './categoria-detalle.component.css',
})
export class CategoriaDetalleComponent implements OnInit {
  categoria: string = '';
  id: string = '';
  url: string = '';

  turnos: any[] = [];
  turnosFiltrados: ITurno[] = [];
  turnoSeleccionado: any = [];

  constructor(
    private route: ActivatedRoute,
    private turnoService: TurnoService,
    private router: Router
  ) {
    this.url = this.route.snapshot.url[0].path;
    console.log('url', this.url);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoria = params['nombre'];
      this.id = params['id'];
      console.log('categoria', this.categoria);
      // if (this.categoria) {
      //   this.verTurnosPorCategoria(this.categoria);
      // }
      // if (this.id) {
      //   this.verTurnoDetalle(this.id);
      // }
      this.loadTurnos();
    });
  }

  loadTurnos(): void {
    this.turnoService.getData().subscribe((data: ITurno[]) => {
      try {
        this.turnos = data;
        if (this.categoria) {
          this.verTurnosPorCategoria(this.categoria);
        }
        if (this.id) {
          this.verTurnoDetalle(this.id);
        }
      } catch (error) {
        console.log('Error al cargar los turnos:', error);
      }
    });
  }

  verTurnosPorCategoria(categoria: string) {
    try {
      this.turnosFiltrados = this.turnos.filter(
        (turno) => turno.categoria === categoria
      );
    } catch (error) {
      console.log('Error al filtrar los turnos por categoria:', error);
    }
  }

  verTurnoDetalle(id: string): void {
    try {
      this.turnoSeleccionado = this.turnos.find((turno) => turno._id === id);
      console.log(this.turnoSeleccionado);
    } catch (error) {
      console.log('Error al seleccionar el turno:', error);
    }
  }

  trackById(index: number, item: ITurno): string {
    return item._id;
  }
}
