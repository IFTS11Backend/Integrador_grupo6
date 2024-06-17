import { Routes } from '@angular/router';
import { EntradaComponent } from './componentes/entrada/entrada.component';
import { SalonesperaComponent } from './componentes/salonespera/salonespera.component';
import { AtencionparticularComponent } from './componentes/atencionparticular/atencionparticular.component';
import { AtencionseguridadComponent } from './componentes/atencionseguridad/atencionseguridad.component';
import { CategoriaDetalleComponent } from './componentes/categoria-detalle/categoria-detalle.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: EntradaComponent,
  },
  {
    path: 'salon',
    title: 'Salon de Espera',
    component: SalonesperaComponent,
  },
  {
    path: 'atencion',
    title: 'Atención Particular',
    component: AtencionparticularComponent,
    children: [
      { path: 'categoria/:nombre', component: TurnosComponent },
    ],
  },
  {
    path: 'seguridad',
    title: 'Atención Seguridad',
    component: AtencionseguridadComponent,
    children: [
      { path: 'categoria/:nombre', component: CategoriaDetalleComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
