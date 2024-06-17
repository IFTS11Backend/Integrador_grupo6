import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton',
  standalone: true,
  imports: [],
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css'
})
export class BotonComponent {
  @Output() clickFunction: EventEmitter<void> = new EventEmitter<void>();
  @Input() title : string = '';
  @Input() content : string = '';
  @Input() image : string = '';

  handleClick(){
    this.clickFunction.emit();
  }
}
