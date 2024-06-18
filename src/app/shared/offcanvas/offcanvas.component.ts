import { Component } from '@angular/core';
import { TurnoService } from '../../servicios/turno.service';
import { ITurno } from '../../interfaces/ITurno';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offcanvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.css',
})
export class OffcanvasComponent {
  listaTurnos: [] = [];
  listaFiltrada: any = [];
  turno: any = {}; //turno seleccionado

  constructor(
    private turnoService: TurnoService,
    private toastSvc: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.turnoService.getData().subscribe(
      (turnos: any) => {
        this.listaTurnos = turnos;
        this.filtrarTurno();
      },
      (error: any) => {
        console.error("Error al cargar los turnos " + error);
      }
    );
  }

  //filtrarTurno por categoria 'cancelado' y 'atendido'
  filtrarTurno(): void {
    const estadosPermitidos = [
      'Cancelado',
      'cancelado',
      'atendido',
      'Atendido',
    ];

    this.listaFiltrada = this.listaTurnos.filter((turno: ITurno) =>
      estadosPermitidos.includes(turno.estado)
    );
    console.log(this.listaFiltrada);
  }

  recuperarTurno(turno: ITurno): void {
   this.turnoService.enEspera(turno.categoria, turno.numero).subscribe({
      next: (response) => {
        this.toastSvc.success('Turno reestablecido', 'Turno');
          setTimeout(() => {
            window.location.reload(); // Recarga toda la página
          }, 1000);
      },
      error: (error) => {
        console.error('Error al recuperar turno:', error);
      },
    });
  }

}
