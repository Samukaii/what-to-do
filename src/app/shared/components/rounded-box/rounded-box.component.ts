import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rounded-box',
  templateUrl: './rounded-box.component.html',
  styleUrls: ['./rounded-box.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundedBoxComponent {
}
