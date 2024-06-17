import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { TurnosComponent } from '../turnos/turnos.component';


@Component({
  selector: 'app-atencionparticular',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, TurnosComponent],

  templateUrl: './atencionparticular.component.html',
  styleUrl: './atencionparticular.component.css',
})
export class AtencionparticularComponent {
  vistaHeader = true; //para ver el header condicionalmente
}
