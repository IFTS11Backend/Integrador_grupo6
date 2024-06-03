import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoria-detalle',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './categoria-detalle.component.html',
  styleUrl: './categoria-detalle.component.css',
})
export class CategoriaDetalleComponent implements OnInit {
  categoria: string = '';
  turnos: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoria = params['nombre'];
      this.loadTurnos(this.categoria);
    });
  }

  //Codigo de muestra hasta cargar los servicios del backend
  loadTurnos(categoria: string): void {    
    if (categoria === 'perros') {
      this.turnos = [25, 26, 27, 28];
    } else if (categoria === 'gatos') {
      this.turnos = [3, 4, 5];
    }else if (categoria === 'animales-exoticos') {
      this.turnos = [10, 11, 12];
    }else if (categoria === 'vacunacion') {
      this.turnos = [15, 16, 17];
    }else if (categoria === 'compras') {
      this.turnos = [20, 21, 22];
    }else{
      this.turnos = [];
    }
  }
}
