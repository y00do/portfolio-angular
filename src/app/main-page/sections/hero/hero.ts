import { Component } from '@angular/core';

@Component({
	selector: 'app-hero',
	standalone: true,
	imports: [],
	templateUrl: './hero.html',
	styleUrl: './hero.scss',
})
export class Hero {
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
