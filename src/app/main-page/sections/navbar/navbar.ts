import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
	selector: 'app-navbar',
	imports: [],
	templateUrl: './navbar.html',
	styleUrl: './navbar.scss',
})
export class Navbar {
	@HostBinding('class.scrolled') scrolled = false;

	@HostListener('window:scroll', [])
	onWindowScroll() {
		this.scrolled = window.scrollY > 0;
	}
}
