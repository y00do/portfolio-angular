import { Component, input } from '@angular/core';

@Component({
	selector: 'app-about-card',
	standalone: true,
	templateUrl: './about-card.html',
	styleUrl: './about-card.scss',
})
export class AboutCard {
	readonly labelledBy = input.required<string>();
	/** Staggered entrance delay multiplier (ms per step) applied via CSS custom property */
	readonly stackIndex = input<number>(0);
	readonly accent = input<'blue' | 'purple' | 'teal'>('blue');
}
