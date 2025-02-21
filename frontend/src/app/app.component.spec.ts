import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'frontend' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render navbar', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const navEl = compiled.querySelector('nav');
    expect(navEl).toBeInstanceOf(HTMLElement);
    expect(navEl!.textContent).toContain('Challenge DGGSM');
  });
});
