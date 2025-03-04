import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RegistrationFormComponent } from '../../shared/components/registration-form/registration-form.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../../core/services/main.service';
import { UIFeedbackService } from '../../core/services/utils/ui-feedback.service';
import { Colaborador } from '../../shared/interfaces/system/system-interfaces';

@Component({
  selector: 'app-recuperar-senha',
  imports: [
    HeaderComponent,
    FooterComponent,
    RegistrationFormComponent
  ],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.scss'
})
export class RecuperarSenhaComponent implements OnInit, OnDestroy {
  private _subscriptionRecuperarSenha: Subscription = new Subscription();
  private _hash = signal('');

  protected data: Colaborador = {} as Colaborador;
  protected enterPassMode = signal(false);
  protected enterMailRecPassMode = signal(false);

  constructor(
    private _router: Router,
    private _mainService: MainService,
    private _uiFeedbackService: UIFeedbackService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._hash.set(this._route.snapshot.paramMap.get('hash') || '');
    if(this._hash() === '_') {
      this.enterPassMode.set(false);
      this.enterMailRecPassMode.set(true);
    }
    else {
      this.enterPassMode.set(true);
      this.enterMailRecPassMode.set(false);
    }
  }

  ngOnDestroy(): void {
    this._subscriptionRecuperarSenha.unsubscribe();
  }

  private _resetPassword(formValue: Colaborador): void {
    this._uiFeedbackService.showLoading(['Estamos redefinindo sua senha', 'Aguarde...']);

    this._subscriptionRecuperarSenha = this._mainService.postRecuperarSenha(this._hash(), formValue.senha).subscribe({
      next: () => {
        this._uiFeedbackService.showSuccess(['Redefinição concluída com sucesso!'], () => {
          this._router.navigate(['auth/login']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this._uiFeedbackService.showError(error);
      }
    });
  }

  private _sendEmail(formValue: Colaborador): void {
    this._uiFeedbackService.showLoading(['Estamos verificando seu email', 'Aguarde...']);

    this._subscriptionRecuperarSenha = this._mainService.getEmailRecuperarSenha(formValue.email).subscribe({
      next: () => {
        this._uiFeedbackService.showSuccess(['Enviamos um link de redefinição para o seu email!'], () => {
          this._router.navigate(['auth/login']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this._uiFeedbackService.showError(error);
      }
    });
  }

  protected onFormSubmit(formValue: Colaborador): void {
    if(this.enterMailRecPassMode()) {
      this._sendEmail(formValue);
    }
    else if(this.enterPassMode()) {
      this._resetPassword(formValue);
    }
  }
}
