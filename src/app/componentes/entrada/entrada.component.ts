import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TurnoService } from '../../servicios/turno.service';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css',
})
export class EntradaComponent {
  nombre: string = '';

  constructor(
    private toastSvc: ToastrService,
    private turnoService: TurnoService
  ) {}

  submit(categoria: string) {
    if (this.nombre.trim() === '') {
      this.toastSvc.error('Por favor, ingrese su nombre');
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
    console.log('Datos adicionales:', additionalData);
    this.turnoService.crearTurno(additionalData).subscribe((response) => {
      console.log('Turno creado:', response);
    });
  }
}
