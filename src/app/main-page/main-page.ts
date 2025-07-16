import { Component } from '@angular/core';
import { Navbar } from './sections/navbar/navbar';

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [Navbar],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {}
