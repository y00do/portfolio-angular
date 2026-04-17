import { Component, HostBinding, OnDestroy, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { throttle } from '../../../shared/utils/throttle.util';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [],
	templateUrl: './navbar.html',
	styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {
	private readonly document = inject(DOCUMENT);
	private readonly scrollListener: () => void;

	@HostBinding('class.scrolled') scrolled = false;
	isMenuOpen = false;

	constructor() {
		// Use throttled passive listener for better performance
		this.scrollListener = throttle(() => {
			this.updateScrollState();
		}, 100);

		this.document.addEventListener('scroll', this.scrollListener, {
			passive: true,
		});
		// Initial check
		this.updateScrollState();
	}

	ngOnDestroy(): void {
		this.document.removeEventListener('scroll', this.scrollListener);
	}

	toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
	}

	closeMenu(): void {
		this.isMenuOpen = false;
	}

	private updateScrollState(): void {
		this.scrolled =
			this.document.documentElement.scrollTop > 0 ||
			this.document.body.scrollTop > 0;
	}
}
