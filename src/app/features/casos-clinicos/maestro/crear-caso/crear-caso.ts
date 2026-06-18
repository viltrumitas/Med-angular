import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input';
import { ButtonComponent } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-crear-caso',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './crear-caso.html',
  styleUrl: './crear-caso.scss',
})
export class CrearCaso {}
