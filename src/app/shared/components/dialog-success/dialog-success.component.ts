import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-success',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dialog-success.component.html',
  styleUrl: './dialog-success.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSuccessComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {}
}
