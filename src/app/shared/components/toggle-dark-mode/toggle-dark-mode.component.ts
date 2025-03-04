import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, Renderer2, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toggle-dark-mode',
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './toggle-dark-mode.component.html',
  styleUrl: './toggle-dark-mode.component.scss'
})
export class ToggleDarkModeComponent implements OnInit, AfterViewInit {
  private modeSubject =  new BehaviorSubject<'light-mode'|'dark-mode'>('light-mode');
  private themeSubject = new BehaviorSubject<string>('lead-gray-theme');

  protected chosenTheme = signal('lead-gray-theme');
  protected isDarkMode = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.checkTheme();
    this.checkMode();

    this.themeSubject.subscribe((theme) => {
      this.chosenTheme.update(() => theme);
      this.refreshClassTheme();

      if(isPlatformBrowser(this.platformID)){
        localStorage.setItem('theme', theme);
      }
    });

    this.modeSubject.subscribe(mode => {
      this.isDarkMode.update(() => (mode === 'dark-mode'));
      this.refreshClassMode();

      if(isPlatformBrowser(this.platformID)){
        localStorage.setItem('mode', ( (this.isDarkMode()) ? 'dark-mode' : 'light-mode' ));
      }
    });
  }

  private checkMode(): void {
    if(isPlatformBrowser(this.platformID)) {
      if((('mode' in localStorage) && (localStorage.getItem('mode') === 'dark-mode'))){
        this.setMode('dark-mode');
      }
      else {
        this.setMode('light-mode');
      }
    }

    this.refreshClassMode();
  }

  protected checkTheme(): void {
    if((typeof localStorage !== 'undefined') && ('theme' in localStorage)){
      this.setTheme(localStorage.getItem('theme') ?? '');
    }
    else {
      this.setTheme('lead-gray-theme');
    }
  }

  private refreshClassMode(): void {
    if(isPlatformBrowser(this.platformID)) {
      const HTML_ELEMENT = document.documentElement;

      if (this.isDarkMode()) {
        this.renderer.addClass(HTML_ELEMENT, 'dark-mode');
      } else {
        this.renderer.removeClass(HTML_ELEMENT, 'dark-mode');
      }
    }
  }

  private refreshClassTheme(): void {
    if(isPlatformBrowser(this.platformID)) {
      const HTML_ELEMENT = document.documentElement;

      const themeClasses: string[] = [ 'lead-gray-theme', 'orange-theme', 'purple-theme', 'violet-theme', 'muss-green-theme', 'brown-theme', 'emerald-theme', 'dark-green-theme' ];

      themeClasses.forEach((theme) => {
        if (theme === this.chosenTheme()) {
          this.renderer.addClass(HTML_ELEMENT, theme);
        } else {
          this.renderer.removeClass(HTML_ELEMENT, theme);
        }
      });
    }

  }

  protected setTheme(theme: string): void {
    this.themeSubject.next(theme);
  }

  protected setMode(mode: 'dark-mode' | 'light-mode'): void {
    this.modeSubject.next(mode);
  }
}
