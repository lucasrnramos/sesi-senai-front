import { HeaderComponent } from '../../shared/components/header/header.component';
import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found-page',
  imports: [
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss'
})
export class NotFoundPageComponent {

  constructor(
    private _location: Location
  ) {}

  protected back(): void {
    this._location.back();
  }

}
