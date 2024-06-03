import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CategoriaDetalleComponent } from '../categoria-detalle/categoria-detalle.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-atencionseguridad',
  standalone: true,
  imports: [HeaderComponent, CategoriaDetalleComponent, NavbarComponent],
  templateUrl: './atencionseguridad.component.html',
  styleUrl: './atencionseguridad.component.css',
})
export class AtencionseguridadComponent {
  vistaHeader = true; //para ver el header condicionalmente
}
