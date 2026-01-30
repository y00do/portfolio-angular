import { Component } from '@angular/core';
import { MainPage } from './main-page/main-page';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [MainPage],
	template: `<main-page></main-page>`,
	styleUrl: './app.scss',
})
export class App {}
