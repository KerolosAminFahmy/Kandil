import { Component, Input } from '@angular/core';
import { unit, Units } from '../../shared/Models/model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusTranslatePipe } from '../../shared/Pipes/status-translate.pipe';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [CommonModule,StatusTranslatePipe,RouterLink],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent {
  @Input("unitData") unit!:Units;
}
