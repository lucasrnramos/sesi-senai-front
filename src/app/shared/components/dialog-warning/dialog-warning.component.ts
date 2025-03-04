import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-warning',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dialog-warning.component.html',
  styleUrl: './dialog-warning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWarningComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {}
}
