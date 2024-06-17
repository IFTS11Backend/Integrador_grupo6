
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CategoriaDetalleComponent } from '../categoria-detalle/categoria-detalle.component';
import { ITurno } from '../../interfaces/ITurno';
import { TurnoProviderService } from '../../servicios/turno.provider.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-salonespera',
  standalone: true,
  imports: [HeaderComponent, RouterLink, CategoriaDetalleComponent],
  templateUrl: './salonespera.component.html',
  styleUrl: './salonespera.component.css',
})
export class SalonesperaComponent implements OnInit, OnDestroy {
  vistaHeader = true; //para ver el header condicionalmente
  url: string = ''; //Ejemplo: localhost:.../salon

  turno: any = {}; //turno seleccionado

  turnos: ITurno[] = []; //todos los turnos
  turnoSeleccionado: any = []; //busca el turno seleccionado por id
  turnoSubscription: Subscription = new Subscription();
  listaSubcription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private turnoProviderService: TurnoProviderService
  ) {
    this.url = this.route.snapshot.url[0].path;
    console.log('url', this.url);
  }

  ngOnInit(): void {
    this.listaSubcription = this.turnoProviderService.listaTurnos$.subscribe(
      (lista) => {
        this.turnos = lista;
        console.log('Lista de turnos:', this.turnos);
      }
    );
    this.turnoSubscription =
      this.turnoProviderService.turnoSeleccionado$.subscribe((turno) => {
        this.turno = turno;
        console.log('Turno actualizado:', this.turno);
      });
  }

  ngOnDestroy(): void {
    if (this.turnoSubscription || this.listaSubcription) {
      this.turnoSubscription.unsubscribe();
      this.listaSubcription.unsubscribe();
    }
  }

  /**
   *
   * @param id Desde el template capturamos el _id del item seleccionado y se muestran los detalles, tanto
   * en el template como en consola.
   */
  verTurnoDetalle(id: string): void {
    try {
      this.turnoSeleccionado = this.turnos.find((turno) => turno._id === id);
      //gurda el turno seleccionado en el servicio interno
      this.turnoProviderService.setTurnoSeleccionado(this.turnoSeleccionado);
      console.log(this.turnoSeleccionado);
    } catch (error) {
      console.log('Error al seleccionar el turno:', error);
    }
  }

  /**
   * Funcion 'helper' para indexar mejor los datos en el iterado del template
   * @param index
   * @param item
   * @returns
   */
  trackById(index: number, item: ITurno): string {
    return `Indice: ${index}, Id: ${item._id}`;
  }
}
