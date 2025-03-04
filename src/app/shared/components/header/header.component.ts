import { SessionDataService } from './../../../core/services/session-data.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleDarkModeComponent } from '../toggle-dark-mode/toggle-dark-mode.component';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    ToggleDarkModeComponent,
    CommonModule,
    RouterModule,
    RouterLink,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _sessionDataService: SessionDataService
  ) { }

  ngOnInit(): void {  }

  public logout(): void {
    this._authService.logout();
  }

  protected logged(): boolean {
    return this._authService.logged;
  }

  protected getNome(): string {
    return this._sessionDataService.getNome || '';
  }
}
