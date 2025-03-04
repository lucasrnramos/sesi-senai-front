import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogActions, MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-info',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dialog-info.component.html',
  styleUrl: './dialog-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {}
}
