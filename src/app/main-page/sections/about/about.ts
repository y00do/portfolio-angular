import {
	afterNextRender,
	Component,
	DestroyRef,
	ElementRef,
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
