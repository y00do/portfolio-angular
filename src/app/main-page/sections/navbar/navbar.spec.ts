import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Navbar } from './navbar';

describe('Navbar', () => {
	let component: Navbar;
	let fixture: ComponentFixture<Navbar>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Navbar],
		}).compileComponents();

		fixture = TestBed.createComponent(Navbar);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render the logo', () => {
		const logo = fixture.debugElement.query(By.css('.logo'));
		expect(logo.nativeElement.textContent).toContain('YEN DO');
	});

	it('should render all nav links', () => {
		const links = fixture.debugElement.queryAll(By.css('.nav-links li a'));
		expect(links.length).toBe(3);
		expect(links[0].nativeElement.textContent).toContain('ABOUT');
		expect(links[1].nativeElement.textContent).toContain('EXPERIENCE');
		expect(links[2].nativeElement.textContent).toContain('PROJECTS');
	});

	it('should render the contact button', () => {
		const button = fixture.debugElement.query(By.css('.btn-contact'));
		expect(button).toBeTruthy();
		expect(button.nativeElement.textContent).toContain('CONTACT');
	});

	it('should have .scrolled class when scrolled', () => {
		component.scrolled = true;
		fixture.detectChanges();
		expect(fixture.nativeElement.classList).toContain('scrolled');
	});

	it('should not have .scrolled class when at top', () => {
		component.scrolled = false;
		fixture.detectChanges();
		expect(fixture.nativeElement.classList).not.toContain('scrolled');
	});
});
