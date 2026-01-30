import { Component, OnDestroy, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { throttle } from '../../../shared/utils/throttle.util';

const SCROLL_HIDE_THRESHOLD = 80;

@Component({
	selector: 'app-hero',
	standalone: true,
	imports: [],
	templateUrl: './hero.html',
	styleUrl: './hero.scss',
})
export class Hero implements OnDestroy {
	private readonly document = inject(DOCUMENT);
	private readonly scrollListener: () => void;

	scrollIconHidden = false;

	constructor() {
		this.scrollListener = throttle(() => {
			this.updateScrollIconVisibility();
		}, 100);

		this.document.addEventListener('scroll', this.scrollListener, {
			passive: true,
		});
		this.updateScrollIconVisibility();
	}

	ngOnDestroy(): void {
		this.document.removeEventListener('scroll', this.scrollListener);
	}

	private updateScrollIconVisibility(): void {
		const scrollTop =
			this.document.documentElement.scrollTop ||
			this.document.body.scrollTop;
		this.scrollIconHidden = scrollTop > SCROLL_HIDE_THRESHOLD;
	}
	readonly profileImageUrl = 'https://placehold.co/400x400';
	readonly professionalSummary =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ' +
		'ut convallis odio. Nullam fermentum odio vitae mollis gravida. ' +
		'Nam convallis turpis nec eros lacinia, eget auctor dolor ' +
		'consectetur. Ut a dolor diam. Nam rutrum dui sed aliquam ' +
		'gravida. Aenean ac finibus mi. Vestibulum sit amet porttitor ' +
		'magna, vitae tempor risus. Maecenas sit amet bibendum massa.';

	onDownloadCV(): void {
		// TODO: Implement CV download functionality
		console.log('Download CV clicked');
	}

	onGetInTouch(): void {
		// TODO: Implement contact functionality
		console.log('Get in Touch clicked');
	}
}
