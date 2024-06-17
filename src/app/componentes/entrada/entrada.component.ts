import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CTurno } from '../../interfaces/CTurno';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css'
})
export class EntradaComponent {

  nombre: string = '';
  turnoGenerado: boolean = false;
  fecha:string = formatDate(new Date(), 'yyyy-mm-dd', 'es');
  hora:string = formatDate(new Date(), 'hh:mm', 'es');

  submit(categoria: string) {
    if (this.nombre.trim() === '') {
      alert('Por favor, ingrese su nombre.');
      return;
    }

    const turno = {
      fecha: this.fecha,
      hora: this.hora,
      nombre: this.nombre,
      categoria: categoria,
      numero: 0
    };

    TurnoService.crearTurno(turno).subscribe((data: any) => {
      console.log('Turno creado:', data);
    });
    
    // Limpiar el campo de nombre
    this.nombre = '';
  }
}
