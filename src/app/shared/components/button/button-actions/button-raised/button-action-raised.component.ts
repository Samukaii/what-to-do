import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Generic } from 'src/app/shared/types/generic';

export type ButtonAction<T = Generic> = T & {
  options?: T;
}

@Component({
  selector: 'app-button-action-raised',
  templateUrl: './button-action-raised.component.html',
  styleUrls: ['./button-action-raised.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonActionRaisedComponent implements ButtonAction {
  @Input() options!: {
    text?: string;
    icon?: string;
    color: ThemePalette;
  }
}
