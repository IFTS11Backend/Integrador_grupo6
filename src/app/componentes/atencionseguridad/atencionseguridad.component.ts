import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CategoriaDetalleComponent } from '../categoria-detalle/categoria-detalle.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
    this.url = this.route.snapshot.url[0].path;
    console.log('url', this.url);
  }

  ngOnInit(): void {}
}
