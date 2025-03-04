import { Component, ElementRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-confirmation',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss'
})
export class DialogConfirmationComponent {
  protected data: ElementRef | string[] = inject(MAT_DIALOG_DATA)
}
