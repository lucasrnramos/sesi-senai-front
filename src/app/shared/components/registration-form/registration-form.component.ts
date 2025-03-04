import { InputValidator } from './../../classes/invalid-input-message';
import { AfterViewInit, Component, EventEmitter, input, Output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Colaborador } from '../../interfaces/system/system-interfaces';
import { CpfMaskDirective } from '../../directives/cpf-mask.directive';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { ResponsePerfis } from '../../interfaces/responses/response';
import { MainService } from '../../../core/services/main.service';

@Component({
  selector: 'app-registration-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    CpfMaskDirective,
    MatProgressBarModule,
    MatTooltipModule,
    AsyncPipe
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent implements AfterViewInit {
  @Output() formSubmit: EventEmitter<Colaborador> = new EventEmitter<Colaborador>();

  public editMode = input(false);
  public enterPassMode = input(false);
  public enterMailRecPassMode = input(false);
  public data = input<Colaborador>({} as Colaborador);

  protected observablePerfis$!: Observable<ResponsePerfis>;

  protected formConfigPerfil!: FormGroup;
  protected inputValidator: InputValidator = new InputValidator();
  protected strength  = signal(0);

  constructor(
    private _formBuilder: FormBuilder,
    private _mainService: MainService
  ) {
    this.formConfigPerfil = this._formBuilder.group({
      nome: [''],
      email: [''],
      cpf: [''],
      senha: [''],
      confirmarSenha: [''],
      id_perfil: [3],
      celular: [''],
      cep: [''],
      uf: [''],
      localidade: [''],
      bairro: [''],
      logradouro: [''],
    }, { validators: this._passwordMatchValidator() });
  }

  ngAfterViewInit(): void {
    this._fillForm();
    this._getPerfis();
    this._setRequiredByMode();
    this._watchPassword();
  }

  private _getPerfis(): void {
    this.observablePerfis$ = this._mainService.getPerfis();
  }

  private _fillForm(): void {
    this.formConfigPerfil.get('nome')?.setValue(this.data().nome);
    this.formConfigPerfil.get('email')?.setValue(this.data().email);
    this.formConfigPerfil.get('cpf')?.setValue(this.data().cpf);
    this.formConfigPerfil.get('id_perfil')?.setValue(this.data().id_perfil?? 3);
    this.formConfigPerfil.get('celular')?.setValue(this.data().celular);
    this.formConfigPerfil.get('cep')?.setValue(this.data().cep);
    this.formConfigPerfil.get('uf')?.setValue(this.data().uf);
    this.formConfigPerfil.get('localidade')?.setValue(this.data().localidade);
    this.formConfigPerfil.get('bairro')?.setValue(this.data().bairro);
    this.formConfigPerfil.get('logradouro')?.setValue(this.data().logradouro);
  }

  private _setRequiredByMode(): void {
    const FORM = this.formConfigPerfil;

    if(this.editMode()) {
      FORM.get('id_perfil')?.setValidators([ Validators.required ]);
    }

    if(this.enterPassMode() || (!this.editMode() && !this.enterMailRecPassMode())) {
      FORM.get('senha')?.setValidators([ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()!])[A-Za-z\d@#$%^&*()!]{8,}$/) ]);
      FORM.get('confirmarSenha')?.setValidators([ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()!])[A-Za-z\d@#$%^&*()!]{8,}$/) ]);
    }

    if(this.enterMailRecPassMode()) {
      FORM.get('email')?.setValidators([ Validators.required, Validators.email, Validators.pattern(/(\.com|\.org|\.br)$/) ]);
    }

    if(!this.enterPassMode() && !this.editMode() && !this.enterMailRecPassMode()) {
      FORM.get('nome')?.setValidators([ Validators.required ]);
      FORM.get('cpf')?.setValidators([ Validators.required ]);
    }

    FORM.get('confirmarSenha')?.updateValueAndValidity();
    FORM.get('id_perfil')?.updateValueAndValidity();
    FORM.get('senha')?.updateValueAndValidity();
    FORM.get('email')?.updateValueAndValidity();
    FORM.get('nome')?.updateValueAndValidity();
    FORM.get('cpf')?.updateValueAndValidity();
  }

  private _watchPassword(): void {
    this.formConfigPerfil.get('senha')?.valueChanges.subscribe(value => {
      this.strength.set(this._calculateStrength(value));
    });
  }

  private _passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const SENHA: string = control.get('senha')?.value;
      const CONFIRMAR_SENHA: string = control.get('confirmarSenha')?.value;
      return SENHA === CONFIRMAR_SENHA ? null : { passwordMismatch: true };
    };
  }

  private _calculateStrength(password: string): number {
    let score = 0;

    if(password) {
      if (password.length >= 8) score += 25;
      if (/[A-Z]/.test(password)) score += 25;
      if (/[0-9]/.test(password)) score += 25;
      if (/[^A-Za-z0-9]/.test(password)) score += 25;
    }

    return score;
  }

  protected getStrengthColor(): string {
    if (this.strength() <= 25) return 'text-[#FF6347]';
    if (this.strength() <= 50) return 'text-[#FF8C00]';
    if (this.strength() <= 75) return 'text-[#FFD700]';
    return 'text-[#32CD32]';
  }

  protected onSubmit(): void {
    if (!this.formConfigPerfil.valid) {
      this.formConfigPerfil.markAllAsTouched();
      return;
    }

    const cpf = this.formConfigPerfil.get('id_perfil')!.value;

    this.formSubmit.emit(this.formConfigPerfil.value);
  }
}
