import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { inputSignal } from "../../utils/input-signal";
import { WithSignals } from "../../decorators/with-signals";
import { ButtonActionModule } from "../button/button-action.module";
import { ButtonActionsFn } from "../button/types/button-actions-fn";

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
	@Input({ required: true }) actionsFn!: ButtonActionsFn<T>;
	@Input() context!: T;
	@Input() alignment: "left" | "center" | "right" = "right";

	alignmentSignal = inputSignal(this, "alignment");
	contextSignal = inputSignal(this, "context");
	actionsFnSignal = inputSignal(this, "actionsFn");

	justifyContent = computed(() => {
		const alignment = this.alignmentSignal();

		if(alignment === "right") return "flex-end";
		if(alignment === "left") return "flex-start";
		return "center";
	})

	computedActions = computed(() => {
		const actionsFn = this.actionsFnSignal();

		return actionsFn(this.contextSignal());
	})
}
