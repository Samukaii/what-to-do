import { inject, Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/overlay";

@Injectable({
	providedIn: "root",
})
export class DialogService {
	private matDialog = inject(MatDialog)

	open<T extends ComponentType<any>>(component: T, config: MatDialogConfig<InstanceType<T> extends {
		data: infer Data
	} ? Data : never>) {
		return this.matDialog.open(component, {
			panelClass: "dialog-overlay",
			width: "800px",
			height: "fit-content",
			...config
		});
	}

	close() {
		this.matDialog.closeAll();
	}
}
































