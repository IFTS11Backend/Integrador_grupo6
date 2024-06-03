import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { CategoriaDetalleComponent } from '../categoria-detalle/categoria-detalle.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-atencionparticular',
  standalone: true,
  imports: [HeaderComponent, CategoriaDetalleComponent, NavbarComponent],
  templateUrl: './atencionparticular.component.html',
  styleUrl: './atencionparticular.component.css',
})
export class AtencionparticularComponent {
  vistaHeader = true; //para ver el header condicionalmente
}
