import { Component, input } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { Cards } from '../../../../shared/components/cards/cards';
@Component({
  selector: 'app-caso',
  imports: [InputComponent, ButtonComponent, Cards],
  templateUrl: './caso.html',
  styleUrl: './caso.scss',
})
export class Caso {}
