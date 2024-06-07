import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

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
  nombreGenerado: string = '';
  categoria: string = '';

 
  generarTurno(tipocategoria: string) {
    if (this.nombre.trim() === '') {
       alert('Por favor, ingrese su nombre.');
      return;
    }

    // Guardar el nombre y tipo de turno en variables locales para mostrar
    this.nombreGenerado = this.nombre;
    this.categoria = tipocategoria;

    // Limpiar el campo de nombre
    this.nombre = '';

    // Mostrar la sección del turno generado
    this.turnoGenerado = true;
  }

}
