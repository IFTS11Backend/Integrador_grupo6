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
  turno: { nombre: string, categoria: string } = { nombre: '', categoria: '' };

  submit(categoria: string) {
    if (this.nombre.trim() === '') {
      alert('Por favor, ingrese su nombre.');
      return;
    }

    // Guardar el nombre y tipo de turno en la variable turno
    this.turno = {
      nombre: this.nombre,
      categoria: categoria
    };

     // Guardar el turno en localStorage
     localStorage.setItem('turno', JSON.stringify(this.turno));

    // Limpiar el campo de nombre
    this.nombre = '';

  }

}
