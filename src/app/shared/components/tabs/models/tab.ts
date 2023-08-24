import { Type } from "@angular/core";

export interface Tab {
	component: Type<any>;
	label: string;
	icon?: string;
}
