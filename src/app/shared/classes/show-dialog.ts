import { inject, Injectable, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogErrorComponent } from "../components/dialog-error/dialog-error.component";
import { Subscription } from "rxjs";
import { AuthService } from "../../core/services/framework/auth.service";
import { DialogWarningComponent } from "../components/dialog-warning/dialog-warning.component";
import { HttpErrorResponse } from "@angular/common/http";
// import { RSMaisClientService } from "../services/rsmais-client.service";

@Injectable({
  providedIn: 'root',
})
export class ShowDialog implements OnDestroy {
  readonly dialog = inject(MatDialog);
  private _subscriptionError$ = new Subscription();

  constructor(private auth: AuthService) {}

  ngOnDestroy(): void {
    this._subscriptionError$.unsubscribe();
  }

  public showError(error: HttpErrorResponse, customMessage?: string, reportEnabled?: boolean): void {
    this.dialog.getDialogById('LOADING')?.close();

    if(error.status == 500) {
      this.dialog.open(DialogErrorComponent, {
        data: {
          code: error.status,
          message: customMessage,
          reportEnabled: reportEnabled
        }
      });
    } else if(error.status === 404) {
      this.dialog.open(DialogWarningComponent, {
        data: [`${(!customMessage) ? error.error.msg ?? error.error.message : customMessage}`]
      })
    } else if(error.status === 401) {
      this.dialog.open(DialogErrorComponent, {
        data: {
          code: error.status,
          message: (!customMessage) ? error.error.msg ?? error.error.message : customMessage,
          statusText: error.statusText,
          reportEnabled: reportEnabled
        }
      }).afterClosed().subscribe(() => {
        this.auth.logout();
      });
    } else {
      this.dialog.open(DialogErrorComponent, {
        data: {
          code: error.status,
          message: (!customMessage) ? error.error.msg ?? error.error.message : customMessage,
          statusText: error.statusText,
          reportEnabled: reportEnabled
        }
      });
    }
  }
}
