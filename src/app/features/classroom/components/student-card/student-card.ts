import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ClassroomApi } from '../../service/clasroom-api.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-student-card',
  imports: [],
  templateUrl: './student-card.html',
  styleUrl: './student-card.scss',
})
export class StudentCard {
  readonly students = input.required<User[]>();
}
