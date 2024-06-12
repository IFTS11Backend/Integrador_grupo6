import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}


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

    // Enviar el turno al servidor
    this.enviarTurnoPorPut();

    // Limpiar el campo de nombre
    this.nombre = '';
  }


  
  enviarTurnoPorPut() {
    const turnoString = localStorage.getItem('turno');

    if (turnoString) {
      const turno = JSON.parse(turnoString);

      this.http.put('https://127.0.0.1', turno).subscribe({
        next: response => {
          console.log('Turno enviado con éxito', response);
        },
        error: error => {
          console.error('Error al enviar el turno:', error);
        }
      });
    } else {
      console.error('No hay turno guardado en localStorage');
    }
  }
}
