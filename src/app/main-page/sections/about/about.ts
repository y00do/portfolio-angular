import {
	afterNextRender,
	Component,
	DestroyRef,
	ElementRef,
	computed,
	inject,
	signal,
} from '@angular/core';

import { AboutCard } from './about-card/about-card';

const ABOUT_CARDS_REVEAL_KEY = 'portfolio-about-cards-revealed';

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [AboutCard],
	templateUrl: './about.html',
	styleUrl: './about.scss',
})
export class About {
	private readonly destroyRef = inject(DestroyRef);
	private readonly host = inject(ElementRef<HTMLElement>);

	/** Shown without motion when reveal already ran this tab session */
	protected readonly instantReveal = signal(false);

	/** Cards visible (animated or instant) */
	protected readonly cardsRevealed = signal(false);
	protected readonly rotationEnabled = signal(true);

	private readonly skillPlanets = [
		'Angular',
		'TypeScript',
		'JavaScript',
		'HTML',
		'SCSS',
		'Tailwind',
		'Node.js',
		'Python',
		'Git',
		'REST APIs',
		'Accessibility',
		'UI/UX',
	];

	protected readonly planets = computed(() => this.skillPlanets.slice(0, 12));

	protected readonly ringLayers = computed(() => {
		const items = this.planets();
		const ringCount = items.length > 6 ? 2 : 1;
		const firstRingCount = Math.min(6, items.length);
		const secondRingCount = Math.min(6, Math.max(items.length - 6, 0));
		const ringSizes = ringCount === 1 ? [firstRingCount] : [firstRingCount, secondRingCount];

		let cursor = 0;
		return ringSizes
			.filter((count) => count > 0)
			.map((count, ringIndex) => {
				const ringPlanets = items.slice(cursor, cursor + count);
				cursor += count;

				return {
					ringIndex,
					planets: ringPlanets.map((label, planetIndex) => ({
						label,
						// Even angular spacing keeps planets opposite each other when count is low.
						angle: (360 / count) * planetIndex,
					})),
				};
			});
	});

	protected readonly systemScale = computed(() => {
		const planetCount = this.planets().length;
		if (planetCount <= 3) return 1.18;
		if (planetCount <= 6) return 1.04;
		if (planetCount <= 9) return 0.94;
		return 0.86;
	});

	constructor() {
		afterNextRender(() => {
			if (typeof sessionStorage === 'undefined') {
				this.instantReveal.set(true);
				this.cardsRevealed.set(true);
				this.applyAllCardReveal();
				this.applyAllCardGlow();
				return;
			}

			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				this.instantReveal.set(true);
				this.cardsRevealed.set(true);
				sessionStorage.setItem(ABOUT_CARDS_REVEAL_KEY, '1');
				this.applyAllCardReveal();
				this.applyAllCardGlow();
				return;
			}

			if (sessionStorage.getItem(ABOUT_CARDS_REVEAL_KEY) === '1') {
				this.instantReveal.set(true);
				this.cardsRevealed.set(true);
				this.applyAllCardReveal();
				this.applyAllCardGlow();
				return;
			}
			this.setupCardRevealObservers();
			this.setupCardGlowObservers();
		});
	}

	protected toggleRotation(): void {
		this.rotationEnabled.update((enabled) => !enabled);
	}

	private applyAllCardReveal(): void {
		this.host.nativeElement.querySelectorAll('.about-card').forEach((el: Element) => {
			(el as HTMLElement).classList.add('about-card--entered');
		});
	}

	private applyAllCardGlow(): void {
		this.host.nativeElement.querySelectorAll('.about-card').forEach((el: Element) => {
			(el as HTMLElement).classList.add('about-card--glow');
		});
	}

	private setupCardGlowObservers(): void {
		const cards = this.host.nativeElement.querySelectorAll('.about-card');
		if (!cards.length) return;

		const glowObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add('about-card--glow');
					glowObserver.unobserve(entry.target);
				}
			},
			{ threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
		);

		cards.forEach((card: Element) => glowObserver.observe(card));
		this.destroyRef.onDestroy(() => glowObserver.disconnect());
	}

	private setupCardRevealObservers(): void {
		const cards = this.host.nativeElement.querySelectorAll('.about-card');
		if (!cards.length) return;

		let enteredCount = 0;
		const revealObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					if (entry.target.classList.contains('about-card--entered')) continue;

					entry.target.classList.add('about-card--entered');
					enteredCount += 1;
					revealObserver.unobserve(entry.target);
				}

				if (enteredCount >= cards.length) {
					this.cardsRevealed.set(true);
					sessionStorage.setItem(ABOUT_CARDS_REVEAL_KEY, '1');
					revealObserver.disconnect();
				}
			},
			{ threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
		);

		cards.forEach((card: Element) => revealObserver.observe(card));
		this.destroyRef.onDestroy(() => revealObserver.disconnect());
	}
}
