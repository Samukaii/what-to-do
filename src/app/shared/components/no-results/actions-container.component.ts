import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, HostBinding, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { inputSignal } from "../../utils/input-signal";
import { WithSignals } from "../../decorators/with-signals";
import { ButtonActionModule } from "../button/button-action.module";
import { ButtonAction } from "../button/types/button-action";

@WithSignals()
@Component({
  selector: 'app-actions-container',
  templateUrl: './actions-container.component.html',
  styleUrls: ['./actions-container.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonActionModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsContainerComponent<T> {
  @Input() actions: ButtonAction<T>[] = [];
  @Input() context!: T;
  @Input() alignment: "left" | "center" | "right" = "right";

  alignmentSignal = inputSignal(this, "alignment");

  justifyContent = computed(() => {
    const alignment = this.alignmentSignal();

    if (alignment === "right") return "flex-end";
    if (alignment === "left") return "flex-start";
    return "center";
  })
}
