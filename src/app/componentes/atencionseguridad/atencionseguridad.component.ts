import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CategoriaDetalleComponent } from '../categoria-detalle/categoria-detalle.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TurnoDbService } from '../../servicios/turno.db.service';
import { ITurno } from '../../interfaces/ITurno';
import { ToastrService } from 'ngx-toastr';
import { TurnoService } from '../../servicios/turno.service';

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
export class AtencionseguridadComponent implements OnInit {
  vistaHeader = true; //para ver el header condicionalmente
  url: string = '';
  turno: any = {};

  constructor(
    private route: ActivatedRoute,
    private turnoDbService: TurnoDbService,
    private turnoService: TurnoService,
    private toastSvc: ToastrService
  ) {
    this.url = this.route.snapshot.url[0].path;
    console.log('url', this.url);
  }
  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.loadSelected();
    })
  }

  loadSelected(): void {
    this.turnoDbService.turnoSelected$.subscribe((data: ITurno) => {
      try {
        if (data) {
          console.log("Turno seleccionado: ", data);
          this.turno = data;          
        };
      } catch (error) {
        console.error('Error al cargar los turnos:', error);
      }
    })
  }
  
  cancelarTurno() {
    const turnoActualizado = { ...this.turno, estado: 'Cancelado' };
    this.turnoDbService.updateTurno(turnoActualizado);
    this.turnoDbService.turnoSelectedSubject.next(turnoActualizado);
    this.toastSvc.warning('Turno cancelado', 'Turno');
  }
  
  eliminarTodo(){
    this.turnoService.resetTodos();
  }
}
