import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-detail.component.html',
  styleUrl: './skeleton-detail.component.css'
})
export class SkeletonDetailComponent {
  @Input() skeletonBlocks: { style: { [key: string]: string } }[] = [];

}
