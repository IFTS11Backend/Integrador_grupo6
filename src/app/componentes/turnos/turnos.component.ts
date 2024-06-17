import { Component, OnInit } from '@angular/core';
import { ITurno } from '../../interfaces/ITurno';
import { ActivatedRoute } from '@angular/router';
import { TurnoModalComponent } from '../turno-modal/turno-modal.component';
import { TurnoDbService } from '../../servicios/turno.db.service';
import { CommonModule } from '@angular/common'; // Necesario para las directivas ngFor y ngIf

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CommonModule, TurnoModalComponent],
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  categoria: string = ''; // Ejemplo: localhost:.../.../categoria/perros...vacunacion...etc
  id: string = ''; // Ejemplo: localhost:.../.../1234

  turnos: ITurno[] = [];
  turnosFiltrados: ITurno[] = [];
  turnoSeleccionado: ITurno = {
    _id: '',
    fecha: '',
    hora: '',
    categoria: '',
    numero: 0,
    nombre: '',
    estado: ''
  };
  modalIsOpen: boolean = false;

  constructor(private route: ActivatedRoute, private turnoDbService: TurnoDbService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoria = params['nombre'];
      this.id = params['id'];
      this.handleCloseModal();
      this.loadTurnos();
    });
  }

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

  verTurnosPorCategoria(categoria: string): void {
    try {
      this.turnosFiltrados = this.turnos.filter(
        (turno) => turno.categoria === categoria
      );
    } catch (error) {
      console.error('Error al filtrar los turnos por categoría:', error);
    }
  }

  handleOpenModal(id: string): void {
    try {
      const turno = this.turnos.find((turno) => turno._id === id);
      if (turno) {
        this.modalIsOpen = true;
        this.turnoSeleccionado = turno;
      } else {
        console.log(`Turno con ID ${id} no encontrado`);
      }
    } catch (error) {
      console.error('Error al seleccionar el turno:', error);
    }
  }

  handleCloseModal(): void {
    this.modalIsOpen = false;
  }

  trackById(index: number, item: ITurno): string {
    return `Indice: ${index}, Id: ${item._id}`;
  }
}
