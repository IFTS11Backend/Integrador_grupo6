import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TurnoService } from '../../servicios/turno.service';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css'
})
export class EntradaComponent {

  constructor(private turnoService: TurnoService){

  }
  nombre: string = '';
  // turnoGenerado: boolean = false;
  turno: { nombre: string, categoria: string } = { nombre: '', categoria: '' };

  submit(categoria: string)  {
    if (this.nombre.trim() === '') {
      alert('Por favor, ingrese su nombre.');
      return;
    }

    const fecha = new Date();
    const additionalData = {
      fecha: fecha.toLocaleDateString(),
      hora: fecha.toLocaleTimeString(),
      categoria: categoria,
      nombre: this.nombre,
      estado: 'en espera',
    };

    this.turnoService.postData(additionalData).subscribe({
      next: (response) => {
        console.log('Respuesta de actualización:', response);
      },
      error: (error) => {
        console.error('Error actualizando el turno:', error);
      }
    });
    
    // Guardar el turno en localStorage
    //  localStorage.setItem('turno', JSON.stringify(this.turno));

    // Limpiar el campo de nombre
    this.nombre = '';

  }

}
