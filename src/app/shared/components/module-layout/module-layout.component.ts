import { MediaMatcher, BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, inject, Input, OnDestroy, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-module-layout',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    RouterModule,
    MatListModule,
    MatExpansionModule,
    MenuComponent
  ],
  templateUrl: './module-layout.component.html',
  styleUrl: './module-layout.component.scss'
})
export class ModuleLayoutComponent implements AfterViewInit, OnDestroy {
  @Input({required: true}) menuItems: Routes = [];

  @ViewChild('menu') protected menu!: MatSidenav;

  protected readonly isMobile = signal(true);
  protected readonly mustClose = signal(false);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(
    private _breakpointObserver: BreakpointObserver
  ) {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 829px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    this._breakpointObserver.observe(['(max-width: 829px)']).subscribe(value => {
      if(value.matches && this.menu.opened) {
        // this.menu.close()
      } else {
        // this.menu.open();
      }
    });

    if(this._mobileQuery.matches && this.menu.opened) {
      // alert('matches');
      // this.menu.toggle();
    }
    else if(!this._mobileQuery.matches && !this.menu.opened) {
      // alert('no matches');
      // this.menu.toggle();
    }
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  protected onClick(): void {
    if(this.isMobile()) {
      this.menu.close();
    }
  }
}
