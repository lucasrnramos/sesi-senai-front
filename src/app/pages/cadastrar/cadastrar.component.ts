import { Subscription } from 'rxjs';
import { MainService } from './../../core/services/main.service';
import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import { RegistrationFormComponent } from '../../shared/components/registration-form/registration-form.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Colaborador } from '../../shared/interfaces/system/system-interfaces';
import { UIFeedbackService } from '../../core/services/utils/ui-feedback.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
// import { ToggleDarkModeComponent } from '../../shared/components/toggle-dark-mode/toggle-dark-mode.component';

@Component({
  selector: 'app-cadastrar',
  imports: [
    HeaderComponent,
    // ToggleDarkModeComponent,
    RegistrationFormComponent,
    FooterComponent,
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss'
})
export class CadastrarComponent implements OnInit, OnDestroy {
  private _subscriptionCadastrar: Subscription = new Subscription();
  private _hash = signal('');

  protected data: Colaborador = {} as Colaborador;

  constructor(
    private _router: Router,
    private _mainService: MainService,
    private _uiFeedbackService: UIFeedbackService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._hash.set(this._route.snapshot.paramMap.get('hash') || '');

    this._mainService.getEmailConvites(this._hash()).subscribe({
      next: response => {
        this.data.email = response.email;
      },
      error: error => {
        this._uiFeedbackService.showError(error);
      }
    });
  }

  ngOnDestroy(): void {
    this._subscriptionCadastrar.unsubscribe();
  }

  protected onFormSubmit(formValue: Colaborador): void {
    this._subscriptionCadastrar = this._mainService.postCadastrarColaborador(formValue).subscribe({
      next: response => {
        this._uiFeedbackService.showSuccess(['Cadastro realizado com sucesso!'], () => {
          this._router.navigate(['auth/login']);
        });
      },
      error: (error: HttpErrorResponse) => {
        this._uiFeedbackService.showError(error);
      }
    })
  }
}
