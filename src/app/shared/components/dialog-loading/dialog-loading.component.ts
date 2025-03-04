import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-loading',
  standalone: true,
  imports: [
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-loading.component.html'
})
export class DialogLoadingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) { }
}
