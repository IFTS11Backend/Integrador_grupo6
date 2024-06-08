import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CategoriaDetalleComponent } from '../categoria-detalle/categoria-detalle.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ITurno } from '../../interfaces/ITurno';
import { Subscription } from 'rxjs';
import { TurnoProviderService } from '../../servicios/turno.provider.service';

@Component({
  selector: 'app-atencionseguridad',
  standalone: true,
  imports: [
    HeaderComponent,
    CategoriaDetalleComponent,
    NavbarComponent,
    RouterLink,
  ],
  templateUrl: './atencionseguridad.component.html',
  styleUrl: './atencionseguridad.component.css',
})
export class AtencionseguridadComponent implements OnInit, OnDestroy {
  vistaHeader = true; //para ver el header condicionalmente
  url: string = '';
  turno: any = {};
  turnoSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private turnoProviderService: TurnoProviderService
  ) {
    this.url = this.route.snapshot.url[0].path;
    console.log('url', this.url);
  }

  ngOnInit(): void {
    this.turnoSubscription =
      this.turnoProviderService.turnoSeleccionado$.subscribe((turno) => {
        this.turno = turno;
        console.log('Turno actualizado:', this.turno);
      });
  }

  ngOnDestroy(): void {
    if (this.turnoSubscription) {
      this.turnoSubscription.unsubscribe();
    }
  }


  cancelarTurno() {
    //obtener el turnoSeleccionado del localstorage y modificar el estado a cancelado
    const turnoAmodificar = localStorage.getItem('turnoSeleccionado');
    if(turnoAmodificar){
      const turno = JSON.parse(turnoAmodificar);
      turno.estado = 'Cancelado';
      this.turnoProviderService.setTurnoSeleccionado(turno);
    }  
  }

  atenderTurno() {
    //obtener el turnoSeleccionado del localstorage y modificar el estado a atendido
    const turnoAmodificar = localStorage.getItem('turnoSeleccionado');
    if(turnoAmodificar){
      const turno = JSON.parse(turnoAmodificar);
      turno.estado = 'Atendiendo';
      this.turnoProviderService.setTurnoSeleccionado(turno);
    }
  }

  finalizarTurno() {
    //obtener el turnoSeleccionado del localstorage y modificar el estado a finalizado
    const turnoAmodificar = localStorage.getItem('turnoSeleccionado');
    if(turnoAmodificar){
      const turno = JSON.parse(turnoAmodificar);
      turno.estado = 'Atendido';
      this.turnoProviderService.setTurnoSeleccionado(turno);
    }
  }

  eliminarTodo(){
    this.turnoProviderService.resetTurnos();
  }


}
