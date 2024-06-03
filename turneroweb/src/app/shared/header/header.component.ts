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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.categoria = params['categoria'];
    });
    console.log('Categoria: ', this.categoria);

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  
  }
}
