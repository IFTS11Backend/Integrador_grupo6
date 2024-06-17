import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { ITurno } from '../../interfaces/ITurno';
import { BotonComponent } from '../../shared/boton/boton.component';
import { TurnoDbService } from '../../servicios/turno.db.service';

@Component({
  selector: 'app-turno-modal',
  standalone: true,
  imports: [BotonComponent],
  templateUrl: './turno-modal.component.html',
  styleUrl: './turno-modal.component.css'
})

export class TurnoModalComponent implements OnInit{
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() turno: ITurno = {
    _id: '',
    fecha: '',
    hora: '',
    categoria: '',
    numero: 0,
    nombre: '',
    estado: ''
  };

  constructor(private turnoDbService: TurnoDbService){
  }

  ngOnInit(){
    console.log("El turno es: ", this.turno);
  }
  
  closeModal(): void {
    this.cerrarModal.emit();
  }

  updateTurno(estado: string): void {
    const turnoActualizado = { ...this.turno, estado: estado };
    this.turnoDbService.updateTurno(turnoActualizado);
  }
}