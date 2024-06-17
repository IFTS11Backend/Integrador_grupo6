import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CategoriaDetalleComponent } from '../categoria-detalle/categoria-detalle.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-salonespera',
  standalone: true,
  imports: [HeaderComponent, CategoriaDetalleComponent, NavbarComponent],
  templateUrl: './salonespera.component.html',
  styleUrl: './salonespera.component.css',
})
export class SalonesperaComponent {
  vistaHeader = true; //para ver el header condicionalmente
}
