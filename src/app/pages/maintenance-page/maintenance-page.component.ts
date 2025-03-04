import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-maintenance-page',
  imports: [
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    RouterLink,
    DividerComponent,
    MatIconModule
  ],
  templateUrl: './maintenance-page.component.html',
  styleUrl: './maintenance-page.component.scss'
})
export class MaintenancePageComponent {
}
