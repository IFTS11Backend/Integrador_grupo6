
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TurnoService } from './servicios/turno.service';
import { ITurno } from './interfaces/ITurno';
import { TurnoProviderService } from './servicios/turno.provider.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  turnos: ITurno[] = [];
  constructor(
    private turnoService: TurnoService,
    private turnoProviderService: TurnoProviderService
  ) {}

  ngOnInit(): void {
    this.loadTurnos();
  }

  /**
   * Cargamos los turnos desde el servicio de la api (turnoService) en principio, para luego
   * trabajar sobre eventos que emulan las acciones con una base de datos.
   */
  loadTurnos(): void {
    this.turnoService.getData().subscribe((data: ITurno[]) => {
      try {
        this.turnos = data;
        this.turnoProviderService.setTurnos(this.turnos);
      } catch (error) {
        console.log('Error al cargar los turnos:', error);
      }
    });
  }
}
