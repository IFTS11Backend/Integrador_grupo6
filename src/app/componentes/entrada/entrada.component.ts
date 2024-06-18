import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TurnoService } from '../../servicios/turno.service';
import { TurnoDbService } from '../../servicios/turno.db.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css'
})
export class EntradaComponent {
  TurnoDbService: any;

  constructor(private turnoService: TurnoService, private turnoDbService: TurnoDbService, private toastSvc: ToastrService){

  }
  nombre: string = '';
  // turnoGenerado: boolean = false;
  turno: { nombre: string, categoria: string } = { nombre: '', categoria: '' };

  submit(categoria: string)  {
    if (this.nombre.trim() === '') {
      this.toastSvc.error('El nombre es requerido', 'Error');
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
        this.turnoDbService.loadInitialData();
        this.toastSvc.success('Turno generado', 'Turno');
      },
      error: (error) => {
        console.error('Error actualizando el turno:', error);

      }
    });

    this.nombre = '';

  }

}
