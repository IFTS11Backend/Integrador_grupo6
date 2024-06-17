import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  categoria: string = '';
  currentDate: Date = new Date(); // Inicializa la fecha actual

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.categoria = url[0].path;
      console.log('Categoria: ', this.categoria);
      switch (this.categoria) {
        case 'salon':
          this.categoria = 'Salón de Espera';
          break;
        case 'atencion':
          this.categoria = 'Atención Particular';
          break;
        case 'seguridad':
          this.categoria = 'Atención Seguridad';
          break;
        default:
          this.categoria = 'Home';
          break;
      }
    });

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
}
