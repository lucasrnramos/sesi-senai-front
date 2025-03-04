import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  @Input({'required': true}) menuItems: Routes = [];
  readonly panelOpened = signal(0);
}
