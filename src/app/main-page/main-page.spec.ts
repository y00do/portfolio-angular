import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MainPage } from './main-page';

describe('Main Page', () => {
  let fixture: ComponentFixture<MainPage>;
  let component: MainPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPage],  // standalone import
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct heading and message', () => {
    const el: HTMLElement = fixture.nativeElement;
    const heading = el.querySelector('h1');
    const paragraph = el.querySelector('p');

    expect(heading?.textContent).toContain('🚧 Work in Progress');
    expect(paragraph?.textContent).toContain('Come back soon to see the finished site.');
  });
});
