import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmationComponent } from "../../../shared/components/dialog-confirmation/dialog-confirmation.component";
import { DialogErrorComponent } from "../../../shared/components/dialog-error/dialog-error.component";
import { DialogInfoComponent } from "../../../shared/components/dialog-info/dialog-info.component";
import { DialogLoadingComponent } from "../../../shared/components/dialog-loading/dialog-loading.component";
import { DialogSuccessComponent } from "../../../shared/components/dialog-success/dialog-success.component";
import { DialogWarningComponent } from "../../../shared/components/dialog-warning/dialog-warning.component";
import { DataError } from "../../../shared/interfaces/system/system-interfaces";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UIFeedbackService {
  private _dialog = inject(MatDialog);

  public showConfirmation(data?: string[], callback?: () => void): void {
    this.closeAll();
    this._dialog.open(DialogConfirmationComponent, {
      id: 'CONFIRMATION',
      disableClose: true,
      data: data
    }).afterClosed().subscribe(() => {
      if(callback) {
        callback();
      }
    });
  }

  public showError(data?: HttpErrorResponse, callback?: () => void): void {
    this.closeAll();
    this._dialog.open(DialogErrorComponent, {
      id: 'ERROR',
      disableClose: true,
      data: data
    }).afterClosed().subscribe(() => {
      if(callback) {
        callback();
      }
    });
  }

  public showInfo(data?: string[], callback?: () => void): void {
    this.closeAll();
    this._dialog.open(DialogInfoComponent, {
      id: 'INFO',
      disableClose: true,
      data: data
    }).afterClosed().subscribe(() => {
      if(callback) {
        callback();
      }
    });
  }

  public showLoading(data?: string[], callback?: () => void): void {
    this.closeAll();
    this._dialog.open(DialogLoadingComponent, {
      id: 'LOADING',
      disableClose: true,
      data: data
    }).afterClosed().subscribe(() => {
      if(callback) {
        callback();
      }
    });
  }

  public showSuccess(data?: string[], callback?: () => void): void {
    this.closeAll();
    this._dialog.open(DialogSuccessComponent, {
      id: 'SUCCESS',
      disableClose: true,
      data: data
    }).afterClosed().subscribe(() => {
      if(callback) {
        callback();
      }
    });
  }

  public showWarning(data?: string[], callback?: () => void): void {
    this.closeAll();
    this._dialog.open(DialogWarningComponent, {
      id: 'WARNING',
      disableClose: true,
    }).afterClosed().subscribe(() => {
      if(callback) {
        callback();
      }
    });
  }


  public closeConfirmation(): void {
    const DIALOD = this._dialog.getDialogById('CONFIRMATION');
    if(DIALOD) {
      DIALOD?.close();
    }
  }

  public closeError(): void {
    const DIALOD = this._dialog.getDialogById('ERROR');
    if(DIALOD) {
      DIALOD?.close();
    }
  }

  public closeInfo(): void {
    const DIALOD = this._dialog.getDialogById('INFO');
    if(DIALOD) {
      DIALOD?.close();
    }
  }

  public closeLoading(): void {
    const DIALOD = this._dialog.getDialogById('LOADING');
    if(DIALOD) {
      DIALOD?.close();
    }
  }

  public closeSuccess(): void {
    const DIALOD = this._dialog.getDialogById('SUCCESS');
    if(DIALOD) {
      DIALOD?.close();
    }
  }

  public closeWarning(): void {
    const DIALOD = this._dialog.getDialogById('WARNING');
    if(DIALOD) {
      DIALOD?.close();
    }
  }

  public closeAll(): void {
    this._dialog.closeAll();
  }
}
