import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeAnimation = trigger('fade', [
	state('in', style({ opacity: 0 })),
	transition(':enter', [
		style({ opacity: 0 }),
		animate(100)
	]),
	transition(':leave', [
		animate(200, style({ opacity: 0 }))
	])
])