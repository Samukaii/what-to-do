import { Generic } from "../../../types/generic";
import { TabData } from "./tab-data";
import { ComponentType } from "@angular/cdk/overlay";

export const buildComponentTab = <Data>(
	component: ComponentType<TabData<Data>>,
	options: Data
) => ({
	name: component,
	options
});

export interface Tab {
	name: string;
	component: ComponentType<Generic> | {
		name: ComponentType<Generic>;
		options: Generic;
	};
	label: string;
	icon?: string;
}
