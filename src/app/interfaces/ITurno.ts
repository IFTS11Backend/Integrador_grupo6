export interface ITurno {
  _id: string;
  fecha: string;
  hora: string;
  categoria: string;
  numero: number;
  nombre: string;
  estado: string;
}


export interface CTurno {
  fecha: string;
  hora: string;
  categoria: string;
  nombre: string;
  estado: string;
}