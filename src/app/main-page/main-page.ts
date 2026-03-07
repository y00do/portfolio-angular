import { Component } from '@angular/core';
import { Navbar } from './sections/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';

@Component({
	selector: 'main-page',
	standalone: true,
	imports: [Navbar, Hero, About],
	templateUrl: './main-page.html',
	styleUrl: './main-page.scss',
})
export class MainPage {}
