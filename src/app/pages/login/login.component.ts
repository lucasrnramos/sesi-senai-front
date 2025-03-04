import { UIFeedbackService } from './../../core/services/utils/ui-feedback.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ToggleDarkModeComponent } from '../../shared/components/toggle-dark-mode/toggle-dark-mode.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InputValidator } from '../../shared/classes/invalid-input-message';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginData } from '../../shared/interfaces/system/system-interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { CpfMaskDirective } from '../../shared/directives/cpf-mask.directive';

@Component({
  selector: 'app-login',
  imports: [
    DividerComponent,
    ReactiveFormsModule,
    CommonModule,
    ToggleDarkModeComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    CpfMaskDirective
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  private _subscriptionLogin: Subscription = new Subscription();

  protected formLogin!: FormGroup;
  protected darkEnabled!: boolean;
  protected inputValidator: InputValidator = new InputValidator();
  protected hide = signal(true);

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: AuthService,
    private _uIFeedbackService: UIFeedbackService
  ){ }

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      cpf: ['', [ Validators.required, Validators.pattern(/\d{3}\.\d{3}\.\d{3}\-\d{2}/), Validators.minLength(14)]],
      senha: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this._subscriptionLogin.unsubscribe();
  }

  protected clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  protected auth(): void {
    if(!this.formLogin.valid) {
      this.formLogin.markAllAsTouched();
      alert(this.formLogin.get('cpf')?.value)
      return;
    }

    this._uIFeedbackService.showLoading();
    const LOGIN_DATA: LoginData = this.formLogin.value;

    this._subscriptionLogin = this._loginService.login(LOGIN_DATA).subscribe({
      next: () => {
        this._uIFeedbackService.closeLoading();
      },
      error: (error: HttpErrorResponse) => {
        this._uIFeedbackService.closeLoading();
        this._uIFeedbackService.showError(error);
      }
    });
  }
}
